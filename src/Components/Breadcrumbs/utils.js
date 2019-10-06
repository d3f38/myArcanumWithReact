function getRepositoryNameFromUrl () {
    const regexpRepository = new RegExp ('(?<=\/api\/repos\/)[^\/]+');
    const repositoryName = window.location.pathname.match(regexpRepository) ? window.location.pathname.match(regexpRepository)[0] : '';

    return repositoryName;
}

function getPathNameFromUrl () {
    const regexpPath = new RegExp ('(?<=\/(tree|blob)\/master\/).+');
    const repositoryPath = window.location.pathname.match(regexpPath) ? window.location.pathname.match(regexpPath)[0] : '';

    return repositoryPath;
}



function getBreadcrumbs () {
    const lineBreadcrubs = getRepositoryNameFromUrl()+'/'+getPathNameFromUrl();

    return lineBreadcrubs.split('/');
}


export { getRepositoryNameFromUrl, getPathNameFromUrl, getBreadcrumbs } 