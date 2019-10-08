module.exports = {
    baseUrl: 'http://localhost:3001/api/repos',
    //baseUrl: 'https://yandex.ru',
    gridUrl: 'http://localhost:4444/wd/hub',

    sets: {
        desktop: {
            files: 'testIntegration/desktop'
        }
    },

    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome'
            }
        }
    }
}