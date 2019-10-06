function getRepositoryNameFromUrl () {
    const regexpRepository = new RegExp ('(?<=\/api\/repos\/)[^\/]+');
    const repositoryName = window.location.pathname.match(regexpRepository) ? window.location.pathname.match(regexpRepository)[0] : '';

    return repositoryName;
}

function getPathNameFromUrl () {
    const regexpPath = new RegExp ('(?<=\/tree\/master\/).+');
    const repositoryPath = window.location.pathname.match(regexpPath) ? window.location.pathname.match(regexpPath)[0] : '';

    return repositoryPath;
}

function requestData (state, repositoryName, path) {
    let directoryItemInfo = [];
    fetch(path)
      .then(res => res.json())
      .then(
          (firstResult) => {
            if (firstResult) {
              fetch(`/api/repos/lastcommit/${repositoryName}`)
              .then(res => res.json())
              .then(
                  (secondResult) => {
                    
                    firstResult.forEach(element => {
                      let commitInfo, neededFile;
                      const hasCommitInfo = item => !!item.match('commitInfo');
    
                      for (let i = 0; i < secondResult.length; i++) {
                          const file = secondResult[i];
                          const reg = new RegExp (`^${element}`,'g')
  
                          if (hasCommitInfo(file)) commitInfo = file;
                          neededFile = (!hasCommitInfo(file) && file.match(reg)) ? file : '';
                          if (commitInfo && neededFile) break;
                      }                    
                      directoryItemInfo.push(`${element}${commitInfo.replace('commitInfo: ', '/').replace(/;$/g,'')}`);
                    });
                    
                    state.setState({
                        isLoaded: true,
                        repository: repositoryName,
                        items: firstResult,
                        lastCommitInfo: directoryItemInfo,
                        location: path
                    });
                  },
                  (error) => {
                    state.setState({
                        isLoaded: true,
                        repository: repositoryName,
                        error
                    });
                  }
              )
            }
          },
          (error) => {
            state.setState({
                isLoaded: true,
                repository: repositoryName,
                error
            });
          }
      )
}


export { requestData, getRepositoryNameFromUrl, getPathNameFromUrl } 