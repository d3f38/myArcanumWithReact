const fs = require('fs');
const {
    exec,
    execFile,
    execFileSync
} = require('child_process');



exports.getRepos = function getRepos(req, res, initPath) {
    fs.readdir(initPath, {
        "withFileTypes": true
    }, (err, files) => {
        const reposArray = files.map(file => file.name);
        res.send(reposArray);
    });
}

exports.getCommits = function getCommits(req, res, initPath) {
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

exports.getCommitsForDirectory = function getCommitsForDirectory(req, res, initPath) {
    const repositoryId = req.params.repositoryId;
    execFile('git', ['log','--name-only', '--pretty=format:"commitInfo: %h/%s/%an/%ar;"'], {
        cwd: `${initPath}/${repositoryId}`,
        maxBuffer: 100000000
    }, (err, out) => {
        if (err) {
            console.error(err)
            res.status(404).send("NOT FOUND.");
        } else {
            const filesArray = out.replace(/"/g,'').split('\n');
            res.send(filesArray);
        }
    });
}

exports.getDiffCommits = function getDiffCommits(req, res, initPath) {
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
                    if (out == '') res.send("NO CHANGES");
                    res.send(out);
                }
            });
        }
    });
}

exports.getContentFromDirectory = function getContentFromDirectory(req, res, initPath) {
    const repositoryId = req.params.repositoryId;
    const commitHash = req.params.commitHash;
    const path = req.params.path;
    let currentCommitHash = commitHash ? commitHash : 'master';
console.log(`${initPath}/${repositoryId}`)
    execFile('git', ['ls-tree', '-r','--name-only', currentCommitHash], {
        cwd: `${initPath}/${repositoryId}`
    }, (err, out) => {
        if (err) {
            console.error(err);
            res.status(404).send("NOT FOUND.");
        } else {
            console.log(out)
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

exports.getContentFromFile = function getContentFromFile(req, res, initPath) {
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

exports.deleteRepository = function deleteRepository(req, res, initPath) {
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

exports.cloneRepository = function cloneRepository(req, res, initPath) {
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

