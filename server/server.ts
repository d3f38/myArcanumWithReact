
const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const {getRepos, getCommits, getCommitsForDirectory, getDiffCommits, getContentFromDirectory, getContentFromFile, deleteRepository, cloneRepository} = require("./utils") ;

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
const initPath:string = process.argv[2];

app.use(express.json())
app.use(cors())
app.listen(port, (err: Error) => {
    if (err) { console.log(err); };
    console.log('Listening on port ' + port);
});

// req: Req, res: Res

app.get('/api/repos', (req: Req, res: Res) => {
    getRepos(req, res, initPath);
});

app.get('/api/repos/lastcommit/:repositoryId', (req: Req, res: Res) => {
    getCommitsForDirectory(req, res, initPath)
});

app.get('/api/repos/:repositoryId/commits/:commitHash', (req: Req, res: Res) => {
    getCommits(req, res, initPath);
});

app.get('/api/repos/:repositoryId/commits/:commitHash/diff', (req: Req, res: Res) => {
    getDiffCommits(req, res, initPath);
});

app.get('/api/repos/:repositoryId/?(tree/:commitHash/:path([^/]*)?)?', (req: Req, res: Res) => {
    getContentFromDirectory(req, res, initPath)
});

app.get('/api/repos/:repositoryId/blob/:commitHash/:pathToFile([^/]*)?', (req: Req, res: Res) => {
    getContentFromFile(req, res, initPath);
});

app.delete('/api/repos/:repositoryId', (req: Req, res: Res) => {
    deleteRepository(req, res, initPath);
});

app.post('/api/repos', (req: Req, res: Res) => {
    cloneRepository(req, res, initPath)
});

app.listen(3000);