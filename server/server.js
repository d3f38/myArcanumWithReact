const express = require('express');
const fs = require('fs');
const app = express();
const port = 5000;
const cors = require('cors')

const {
    exec,
    execFile,
    execFileSync
} = require('child_process');
const initPath = process.argv[2];

app.use(express.json())
app.use(cors())
app.listen(port, (err) => {
    if (err) { console.log(err); };
    console.log('Listening on port ' + port);
});

app.get('/api/repos', (req, res) => {
    getRepos(req, res);
});

app.get('/api/repos/lastcommit/:repositoryId', (req, res) => {
    getCommitsForDirectory(req, res)
});

app.get('/api/repos/:repositoryId/commits/:commitHash', (req, res) => {
    getCommits(req, res);
});

app.get('/api/repos/:repositoryId/commits/:commitHash/diff', (req, res) => {
    getDiffCommits(req, res);
});

app.get('/api/repos/:repositoryId/?(tree/:commitHash/:path([^/]*)?)?', (req, res) => {
    getContentFromDirectory(req, res)
});

app.get('/api/repos/:repositoryId/blob/:commitHash/:pathToFile([^/]*)?', (req, res) => {
    getContentFromFile(req, res);
});

app.delete('/api/repos/:repositoryId', (req, res) => {
    deleteRepository(req, res);
});

app.post('/api/repos', (req, res) => {
    cloneRepository(req, res)
});

function getRepos(req, res) {
    fs.readdir(initPath, {
        "withFileTypes": true
    }, (err, files) => {
        const reposArray = files.map(file => file.name);
        res.send(reposArray);
    });
}

function getCommits(req, res) {
    const repositoryId = req.params.repositoryId;
    const commitHash = req.params.commitHash;
    execFile('git', ['log', commitHash, '--pretty=format:"{commit: %h, date: %ad, comments: %s}"'], {
        cwd: `${initPath}/${repositoryId}`
    }, (err, out) => {
        if (err) {
            console.error(err)
            res.status(404).send("NOT FOUND.");
        } else {
            let commitsObject = [];
            const commitDetailsArray = out.match(/(?<={commit: )\w+|(?<=, date: )[\w\s:-]+|(?<=comments: )[^}]+/g);

            if (commitDetailsArray.length >= 3) {
                for (let i = 0, lenght = commitDetailsArray.length - 3; i < lenght; i = i + 3) {
                    commitsObject.push({
                        "commitHash": commitDetailsArray[i],
                        "date": commitDetailsArray[i + 1],
                        "comments": commitDetailsArray[i + 2]
                    })
                }

                res.send(commitsObject);
            }
        }
    });
}

function getCommitsForDirectory(req, res) {
    const repositoryId = req.params.repositoryId;
    execFile('git', ['log','--name-only', '--pretty=format:"commitInfo: %h/%s/%an/%ar;"'], {
        cwd: `${initPath}/${repositoryId}`,
        maxBuffer: 100000000
    }, (err, out) => {
        if (err) {
            console.error(err)
            res.status(404).send("NOT FOUND.");
        } else {
            let commitsObject = [];

            const filesArray = out.replace(/"/g,'').split('\n');
            res.send(filesArray);
            // let commitInfo = '';
            // let neededFile = '';
            // const hasCommitInfo = item => !!item.match('commitInfo');

            // for (let i = 0; i < filesArray.length; i++) {
            //     const file = filesArray[i];

            //     if (hasCommitInfo(file)) commitInfo = file;
            //     neededFile = (!hasCommitInfo(file) && file.match(/^cmake.+/)) ? file : '';
            //     if (commitInfo && neededFile) break;
                
            // }
            // res.send(commitInfo + ' => ' + neededFile);
        }
    });
}

function getDiffCommits(req, res) {
    const repositoryId = req.params.repositoryId;
    const commitHash = req.params.commitHash;
    let currentCommit, previousCommit;

    process.chdir(`./${initPath}/${repositoryId}`);

    exec(`git log`, (err, out) => {
        if (err) {
            console.error(err);
            res.status(404).send("NOT FOUND.");
        } else {
            commitsArray = out.match(/(?<=commit ).+/g);
            for (let i = 0; i < commitsArray.length; i++) {
                const reg = new RegExp(`^${commitHash}`);
                if (commitsArray[i].match(reg)) {
                    currentCommit = commitsArray[i];
                    previousCommit = commitsArray[i + 1] ? commitsArray[i + 1] : '';
                    break;
                }
            }

            exec(`git diff ${currentCommit} ${previousCommit}`, (err, out) => {
                if (err) {
                    console.error(err);
                    res.status(404).send("NOT FOUND.");
                } else {
                    if (out == '') res.send("NO SHANGES");
                    res.send(out);
                }
            });
        }
    });
}

function getContentFromDirectory(req, res) {
    const repositoryId = req.params.repositoryId;
    const commitHash = req.params.commitHash;
    const path = req.params.path;
    let currentCommitHash = commitHash ? commitHash : 'master';

    execFile('git', ['ls-tree', '-r','--name-only', currentCommitHash], {
        cwd: `${initPath}/${repositoryId}`
    }, (err, out) => {
        if (err) {
            console.error(err);
            res.status(404).send("NOT FOUND.");
        } else {
            const filesArray = out.split('\n').filter(item => item);
            const filesFromDirectory = filesArray.filter(file => file.match(path));
            const newArray = [];
            const isFolder = item => !!item.match('/'); 
            
            filesFromDirectory.forEach(file => {
                
                const currentFile = file.replace(`${path}/`, '');
                
                if (isFolder(currentFile)) {
                    const separetedFile = currentFile.match(/[^\/]+(?=\/)?/)[0];
                    const output = 'folder/' + separetedFile;
                
                    if (newArray.indexOf(output) == -1) {
                        newArray.push(output)
                    }
                } else {
                    const separetedFile = currentFile;
                    const typeFile = separetedFile.substr(separetedFile.lastIndexOf('.') + 1) || separetedFile;
                    const output = typeFile + '/' + separetedFile;

                    if (newArray.indexOf(output) == -1) {
                        newArray.push(output);
                    }
                }
            });
            res.send(newArray.sort())
        }
    });
    
}

function getContentFromFile(req, res) {
    const repositoryId = req.params.repositoryId;
    const commitHash = req.params.commitHash;
    const pathToFile = req.params.pathToFile;

    execFile('git', ['show', `${commitHash}:${pathToFile}`], {
        cwd: `${initPath}/${repositoryId}`
    }, (err, out) => {

        if (err) {
            console.error(err);
            res.status(404).send("NOT FOUND.");
        } else {
            res.send(out.split('\n'))
        }
    });
}

function deleteRepository(req, res) {
    const repositoryId = req.params.repositoryId;

    fs.rmdir(`${initPath}/${repositoryId}`, { "recursive": true }, (err, out) => {
        if (err) {
            console.error(err);
            res.status(404).send("NOT FOUND.");
        } else {
            res.send('Repository deleted')
        }
    });
}

function cloneRepository(req, res) {
    execFile('git', ['clone', req.body.url], {
        cwd: `${initPath}`
    }, (err, out) => {

        if (err) {
            console.error(err);
            res.status(404).send("NOT FOUND.");
        } else {
            res.send("repository loaded")
        }
    });
}

app.listen(3000);