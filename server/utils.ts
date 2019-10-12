// const express = require('express');
// import express from 'express';
const fs = require('fs');
const {
    exec,
    execFile
} = require('child_process');

interface Status {
    send: ([]) => void;
}

interface Params {
    repositoryId: string;
    commitHash: string;
    pathToFile: string;
    path: string;
}

interface Req {
    send: ([]) => void | Status;
    params: Params;
    body: {url: string}
}
 
interface Res {
    send: (item: string | string[]| { "commitHash": string, "date": string, "comments": string }[]) => string[];
    status: (item:number) => { send: (item: string) => void  };
}

function getRepos(req: Req, res: Res, initPath: string) {
    fs.readdir(initPath, {
        "withFileTypes": true
    }, (err: Error, files: []) => {
        const reposArray = files.map((file: {name: string}) => file.name);
        res.send(reposArray);
    });
}

function getCommits(req: Req, res: Res, initPath: string) {
    const repositoryId = req.params.repositoryId;
    const commitHash = req.params.commitHash;
    console
    execFile('git', ['log', commitHash, '--pretty=format:"{commit: %h, date: %ad, comments: %s}"'], {
        cwd: `${initPath}/${repositoryId}`
    }, (err: Error, out: string) => {
        if (err) {
            console.error(err)
            res.status(404).send("NOT FOUND.");
        } else {
            let commitsObject = [];
            const commitDetailsArray = out.match(/(?<={commit: )\w+|(?<=, date: )[\w\s:-]+|(?<=comments: )[^}]+/g);

            if (commitDetailsArray!.length >= 3) {
                for (let i = 0, lenght = commitDetailsArray!.length - 3; i < lenght; i = i + 3) {
                    commitsObject.push({
                        "commitHash": commitDetailsArray![i],
                        "date": commitDetailsArray![i + 1],
                        "comments": commitDetailsArray![i + 2]
                    })
                }

                res.send(commitsObject);
            }
        }
    });
}

function getCommitsForDirectory(req: Req, res: Res, initPath: string) {
    const repositoryId = req.params.repositoryId;
    execFile('git', ['log','--name-only', '--pretty=format:"commitInfo: %h/%s/%an/%ar;"'], {
        cwd: `${initPath}/${repositoryId}`,
        maxBuffer: 100000000
    }, (err: Error, out: string) => {
        if (err) {
            console.error(err)
            res.status(404).send("NOT FOUND.");
        } else {
            const filesArray = out.replace(/"/g,'').split('\n');
            res.send(filesArray);
        }
    });
}

function getDiffCommits(req: Req, res: Res, initPath: string) {
    const repositoryId = req.params.repositoryId;
    const commitHash = req.params.commitHash;
    let currentCommit: string, previousCommit: string;

    process.chdir(`./${initPath}/${repositoryId}`);

    exec(`git log`, (err: Error, out: string) => {
        if (err) {
            console.error(err);
            res.status(404).send("NOT FOUND.");
        } else {
            let commitsArray = out.match(/(?<=commit ).+/g);
            for (let i = 0; i < commitsArray!.length; i++) {
                const reg = new RegExp(`^${commitHash}`);
                if (commitsArray![i].match(reg)) {
                    currentCommit = commitsArray![i];
                    previousCommit = commitsArray![i + 1] ? commitsArray![i + 1] : '';
                    break;
                }
            }

            exec(`git diff ${currentCommit} ${previousCommit}`, (err: Error, out: string) => {
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

function getContentFromDirectory(req: Req, res: Res, initPath: string) {
    const repositoryId = req.params.repositoryId;
    const commitHash = req.params.commitHash;
    const path = req.params.path;
    let currentCommitHash = commitHash ? commitHash : 'master';

    execFile('git', ['ls-tree', '-r','--name-only', currentCommitHash], {
        cwd: `${initPath}/${repositoryId}`
    }, (err: Error, out: string) => {
        if (err) {
            console.error(err);
            res.status(404).send("NOT FOUND.");
        } else {
            const filesArray = out.split('\n').filter(item => item);
            const filesFromDirectory = filesArray.filter(file => file.match(path));
            const newArray: string[] = [];
            const isFolder = (item: string) => !!item.match('/'); 
            
            filesFromDirectory.forEach(file => {
                
                const currentFile = file.replace(`${path}/`, '');
                
                if (isFolder(currentFile)) {
                    const separetedFile = currentFile.match(/[^\/]+(?=\/)?/)![0];
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

function getContentFromFile(req: Req, res: Res, initPath: string) {
    const repositoryId = req.params.repositoryId;
    const commitHash = req.params.commitHash;
    const pathToFile = req.params.pathToFile;

    execFile('git', ['show', `${commitHash}:${pathToFile}`], {
        cwd: `${initPath}/${repositoryId}`
    }, (err: Error, out: string) => {

        if (err) {
            console.error(err);
            res.status(404).send("NOT FOUND.");
        } else {
            res.send(out.split('\n').filter(item => item))
        }
    });
}

function deleteRepository(req: Req, res: Res, initPath: string) {
    const repositoryId = req.params.repositoryId;

    fs.rmdir(`${initPath}/${repositoryId}`, (err: Error) => {
        if (err) {
            console.error(err);
            res.status(404).send("NOT FOUND.");
        } else {
            res.send('Repository deleted')
        }
    });
}

function cloneRepository(req: Req, res: Res, initPath: string) {
    execFile('git', ['clone', req.body.url], {
        cwd: `${initPath}`
    }, (err: Error, out: string) => {

        if (err) {
            console.error(err);
            res.status(404).send("NOT FOUND.");
        } else {
            res.send("repository loaded")
        }
    });
}
export { getRepos, getCommits, getCommitsForDirectory, getDiffCommits, getContentFromDirectory, getContentFromFile, deleteRepository, cloneRepository }
