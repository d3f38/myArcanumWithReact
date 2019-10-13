const pathname: string  = window.location.pathname;

function getRepositoryNameFromUrl () {
    const regexpRepository = new RegExp ('(?<=\/api\/repos\/)[^\/]+');
    const repositoryName = pathname.match(regexpRepository) ? pathname.match(regexpRepository)![0] : '';

    return repositoryName;
}



function getPathNameFromUrl () {
    const regexpPath = new RegExp ('(?<=\/(tree|blob)\/master\/).+');
    const matchArray = pathname.match(regexpPath);
    const repositoryPath = pathname.match(regexpPath) ? matchArray![0] : '';

    return repositoryPath;
}

function getBreadcrumbs () {
    const lineBreadcrubs = getRepositoryNameFromUrl()+'/'+getPathNameFromUrl();

    return lineBreadcrubs.split('/');
}

export { getRepositoryNameFromUrl, getPathNameFromUrl, getBreadcrumbs } 