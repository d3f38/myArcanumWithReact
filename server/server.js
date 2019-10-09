const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors')
const {getRepos, getCommits, getCommitsForDirectory, getDiffCommits, getContentFromDirectory, getContentFromFile, deleteRepository, cloneRepository} = require('./utils')

const initPath = process.argv[2];

app.use(express.json())
app.use(cors())
app.listen(port, (err) => {
    if (err) { console.log(err); };
    console.log('Listening on port ' + port);
});

app.get('/api/repos', (req, res) => {
    getRepos(req, res, initPath);
});

app.get('/api/repos/lastcommit/:repositoryId', (req, res) => {
    getCommitsForDirectory(req, res, initPath)
});

app.get('/api/repos/:repositoryId/commits/:commitHash', (req, res) => {
    getCommits(req, res, initPath);
});

app.get('/api/repos/:repositoryId/commits/:commitHash/diff', (req, res) => {
    getDiffCommits(req, res, initPath);
});

app.get('/api/repos/:repositoryId/?(tree/:commitHash/:path([^/]*)?)?', (req, res) => {
    getContentFromDirectory(req, res, initPath)
});

app.get('/api/repos/:repositoryId/blob/:commitHash/:pathToFile([^/]*)?', (req, res) => {
    getContentFromFile(req, res, initPath);
});

app.delete('/api/repos/:repositoryId', (req, res) => {
    deleteRepository(req, res, initPath);
});

app.post('/api/repos', (req, res) => {
    cloneRepository(req, res, initPath)
});

app.listen(3000);