const assert = require('assert');

const repositoryName = 'Yandex';
const pathToDirectory = 'css';
const pathToFile = 'css/normalize.css';

describe(`На странице /api/repos/${repositoryName} правильно отображается содержимое`, () => {

    it('блока .header', function() {
        return this.browser
            .url(`/api/repos/${repositoryName}`)
            .isExisting('.header')
            .then((exists) => {
                assert.ok(exists, '.header не появился');
            })
    })

    it('блока .main-content', function() {
        return this.browser
            .url(`/api/repos/${repositoryName}`)
            .isExisting('.main-content')
            .then((exists) => {
                assert.ok(exists, '.main-content не появился');
            })
    })

    it('блока .directory-content-details__item (файл или папка в директории)', function() {
        return this.browser
            .url(`/api/repos/${repositoryName}`)
            .isExisting('.directory-content-details__item ')
            .then((exists) => {
                assert.ok(exists, '.directory-content-details__item не появился');
            })
    })

    it('блока .footer', function() {
        return this.browser
            .url(`/api/repos/${repositoryName}`)
            .isExisting('.footer')
            .then((exists) => {
                assert.ok(exists, '.footer не появился');
            })
    })

    it('блока .repository-list (ссылки на репозитории)', function() {
        return this.browser
            .url(`/api/repos/${repositoryName}`)
            .isExisting('.repository-list__repository-name a')
            .then((exists) => {
                assert.ok(exists, 'список репозиториев не появился');
            })
    })
})

describe(`На странице /api/repos/${repositoryName}/tree/master/${pathToDirectory} правильно отображается содержимое`, () => {

    it('блока .header', function() {
        return this.browser
            .url(`/api/repos/${repositoryName}/tree/master/${pathToDirectory}`)
            .isExisting('.header')
            .then((exists) => {
                assert.ok(exists, '.header не появился');
            })
    })

    it('блока .main-content', function() {
        return this.browser
            .url(`/api/repos/${repositoryName}/tree/master/${pathToDirectory}`)
            .isExisting('.main-content')
            .then((exists) => {
                assert.ok(exists, '.main-content не появился');
            })
    })

    it('блока .directory-content-details__item (файл или папка в директории)', function() {
        return this.browser
            .url(`/api/repos/${repositoryName}/tree/master/${pathToDirectory}`)
            .isExisting('.directory-content-details__item ')
            .then((exists) => {
                assert.ok(exists, '.directory-content-details__item не появился');
            })
    })

    it('блока .footer', function() {
        return this.browser
            .url(`/api/repos/${repositoryName}/tree/master/${pathToDirectory}`)
            .isExisting('.footer')
            .then((exists) => {
                assert.ok(exists, '.footer не появился');
            })
    })

    it('блока .repository-list (ссылки на репозитории)', function() {
        return this.browser
            .url(`/api/repos/${repositoryName}/tree/master/${pathToDirectory}`)
            .isExisting('.repository-list__repository-name a')
            .then((exists) => {
                assert.ok(exists, 'список репозиториев не появился');
            })
    })
})

describe(`На странице /api/repos/${repositoryName}/blob/master/${pathToDirectory} правильно отображается содержимое`, () => {

    it('блока .header', function() {
        return this.browser
            .url(`/api/repos/${repositoryName}/blob/master/${pathToDirectory}`)
            .isExisting('.header')
            .then((exists) => {
                assert.ok(exists, '.header не появился');
            })
    })

    it('блока .main-content', function() {
        return this.browser
            .url(`/api/repos/${repositoryName}/blob/master/${pathToDirectory}`)
            .isExisting('.main-content')
            .then((exists) => {
                assert.ok(exists, '.main-content не появился');
            })
    })

    it('блока .file-line (содержимое файла)', function() {
        return this.browser
            .url(`/api/repos/${repositoryName}/blob/master/${pathToDirectory}`)
            .isExisting('.file-line ')
            .then((exists) => {
                assert.ok(exists, '.file-line не появился');
            })
    })

    it('блока .footer', function() {
        return this.browser
            .url(`/api/repos/${repositoryName}/blob/master/${pathToDirectory}`)
            .isExisting('.footer')
            .then((exists) => {
                assert.ok(exists, '.footer не появился');
            })
    })

    it('блока .repository-list (ссылки на репозитории)', function() {
        return this.browser
            .url(`/api/repos/${repositoryName}/blob/master/${pathToDirectory}`)
            .isExisting('.repository-list__repository-name a')
            .then((exists) => {
                assert.ok(exists, 'список репозиториев не появился');
            })
    })
})

describe('Правильно работает переход', () => {

    it('между репозиториями', function() {
        return this.browser
            .url(`/api/repos/${repositoryName}`)
            .$('.choice-repository ').click()
            .$('.repository-list__repository-name a').click()
            .isExisting('.directory-content-details__item')
            .then((exists) => {
                assert.ok(exists, 'приложение упало');
            })
    })

    it('из списка файлов во вложенную папку', function() {
        return this.browser
            .url(`/api/repos/${repositoryName}`)
            .waitForExist('.directory-content-details__name_link', 5000)
            .$('.directory-content-details__name_link ').click()
            .waitForExist('.directory-content-details__name_link', 5000)
            .then((exists) => {
                assert.ok(exists, 'содержимое отсутствует');
            })
    })
    
    it('из списка файлов на страницу отдельного файла', function() {
        return this.browser
            .url(`/api/repos/${repositoryName}`)
            .waitForExist('.directory-content-details__name_link', 5000)
            .$('.directory-content-details__name_link[href*="blob"]').click()
            .waitForExist('.file-line', 5000)
            .then((exists) => {
                assert.ok(exists, 'содержимое отсутствует');
            })
    })
})

