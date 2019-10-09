
const {getRepos, getContentFromDirectory, getContentFromFile} = require('./server/utils')

const expect = require('chai').expect;

const fs = require('fs');

const repositoryId = 'Yandex';
const pathToFile = 'README.md';
const commitHash = 'master';
const initPath = './testData';

describe('Запросы:', () => {
    describe('При запросе списка репозиториев', () => {
        it('на выходе получаем массив', () => {

            getRepos( {},
                {send: (reposArray) =>{ expect(reposArray).to.be.a('array')}},
                initPath
            );
        });

        it('в массиве приходят нужные репозитории', () => {

            const stubArrayList = [
                'first-repo',
                'proxygen',
                'react',
                'second-repo',
                'Yandex',
                'zero-repo'
            ];

            fs.readdir(initPath, {
                "withFileTypes": true
            }, (err, files) => {
                const reposArray = files.map(file => file.name);
                // assert.deepEqual(reposArray, stubArrayList);
                expect(reposArray).to.deep.equal(stubArrayList);
            });
        });
    })

    describe('При запросе содержимого', () => {
        it('репозитория приходят нужное содержимое', () => {

            const stubArrayList = ["folder/css","folder/img","folder/node_modules","html/index.html","js/script.js","js/server.js","json/package-lock.json","json/tablo.json","md/README.md"];
            getContentFromDirectory ( {
                params: {repositoryId: repositoryId}
            },
                {send: (reposArray) => { expect(reposArray).to.deep.equal(stubArrayList);}},
                initPath
            );
        });
        it('файла приходят нужное содержимое', () => {

            const stubArrayList = ["# Yandex","Test"];

            getContentFromFile ( {
                    params: {repositoryId: repositoryId, commitHash: commitHash, pathToFile: pathToFile}
                },
                {
                    send: (reposArray) => { expect(reposArray).to.deep.equal(stubArrayList);}
                },
                initPath
            );
        });
    });
})
