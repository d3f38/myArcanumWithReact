
const { getRepos, getCommitsForDirectory, getContentFromDirectory, getContentFromFile } = require('./server/server')
const { requestData } = require('./src/Components/DirectoryContent/utils')

const assert = require('chai').assert;

const expect = require('chai').expect;

const fs = require('fs');
const {execFile} = require('child_process');



const initPath = './testData';

describe('Запросы:', () => {
    describe('При запросе списка репозиториев', () => {
        it('на выходе получаем массив', () => {
            // getRepos( {},
            //     {send: (reposArray) =>{ assert.typeOf(reposArray, 'array')}},
            //     initPath
            // );
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
        it('файла приходят нужное содержимое', () => {

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
    });

    describe('При запросе содержимого репозитория', () => {

        it('Данные входа совпадают с данными заглушкой', () => {

            const allInfoStub =
            {
                fileName:
                    [ 'css/fonts/MyriadPro-Regular.otf',
                    'css/fonts/MyriadPro-Regular.ttf',
                    'css/fonts/MyriadPro-Regular.woff',
                    'css/fonts/MyriadPro-Regular.woff2',
                    'css/style.css',
                    'html/index.html',
                    'img/Thumbs.db',
                    'img/electro.png',
                    'img/gas.png',
                    'js/main.js',
                    'js/mydataarea.js' ],
                log:
                    [ '23396f7:dogunok:8 months ago:finale project',
                    'css/fonts/MyriadPro-Regular.otf',
                    'css/fonts/MyriadPro-Regular.ttf',
                    'css/fonts/MyriadPro-Regular.woff',
                    'css/fonts/MyriadPro-Regular.woff2',
                    'css/style.css',
                    'html/index.html',
                    'img/Thumbs.db',
                    'img/electro.png',
                    'img/gas.png',
                    'js/main.js',
                    'js/mydataarea.js' ]
            };

            const allInfo =
            {
                fileName: [],
                log: []
            };

            execFile('git' ,
            [`ls-tree`, `-r`, `--name-only`, `master`],
            {cwd: `./${initPath}/interactiveMap`, maxBuffer: 100000000},
            (err, out) => {
                out.trim().split('\n').map((item, i) => allInfo.fileName.push(item));
            })

            execFile('git' ,
            [`log`, `--name-only`, `--pretty=format:%h:%an:%ar:%s`, `master`],
            {cwd: `./${initPath}/interactiveMap`, maxBuffer: 100000000},
            (err, out) => {
                out.trim().split('\n').map((item, i) => allInfo.log.push(item));
            })

            const checkInfo = setInterval(() => {
                if(allInfo.fileName.length > 0 && allInfo.log.length > 0){
                    clearInterval(checkInfo)
                    assert.deepEqual(allInfo, allInfoStub)
                }
            }, 100)


        })

        it('На выходе "allFile.fileName" не изменил тип и он === "Array" ', () => {
            const allInfo =
            {
                fileName: [],
                log: []
            };

            execFile('git' ,
            [`ls-tree`, `-r`, `--name-only`, `master`],
            {cwd: `./${initPath}/interactiveMap`, maxBuffer: 100000000},
            (err, out) => {
                out.trim().split('\n').map((item, i) => allInfo.fileName.push(item));
            })

            execFile('git' ,
            [`log`, `--name-only`, `--pretty=format:%h:%an:%ar:%s`, `master`],
            {cwd: `./${initPath}/interactiveMap`, maxBuffer: 100000000},
            (err, out) => {
                out.trim().split('\n').map((item, i) => allInfo.log.push(item));
            })

            const checkInfo = setInterval(() => {
                if(allInfo.fileName.length > 0 && allInfo.log.length > 0){
                    clearInterval(checkInfo)
                    assert.typeOf(allInfo.fileName, 'array', 'На выходе не "Array"')
                }
            }, 100)
        })

        it('На выходе "allFile.log" не изменил тип и он === "Array" ', () => {
            const allInfo =
            {
                fileName: [],
                log: []
            };

            execFile('git' ,
            [`ls-tree`, `-r`, `--name-only`, `master`],
            {cwd: `./${initPath}/interactiveMap`, maxBuffer: 100000000},
            (err, out) => {
                out.trim().split('\n').map((item, i) => allInfo.fileName.push(item));
            })

            execFile('git' ,
            [`log`, `--name-only`, `--pretty=format:%h:%an:%ar:%s`, `master`],
            {cwd: `./${initPath}/interactiveMap`, maxBuffer: 100000000},
            (err, out) => {
                out.trim().split('\n').map((item, i) => allInfo.log.push(item));
            })

            const checkInfo = setInterval(() => {
                if(allInfo.fileName.length > 0 && allInfo.log.length > 0){
                    clearInterval(checkInfo);
                    assert.typeOf(allInfo.log, 'array', 'На выходе не "Array"');
                }
            }, 100);
        })

    })

})
