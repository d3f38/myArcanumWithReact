function getRepositoryNameFromUrl () {
    const regexpRepository = new RegExp ('(?<=\/api\/repos\/)[^\/]+');
    const repositoryName = window.location.pathname.match(regexpRepository) ? window.location.pathname.match(regexpRepository)![0] : '';

    return repositoryName;
}

function getPathNameFromUrl () {
    const regexpPath = new RegExp ('(?<=\/tree\/master\/).+');
    const repositoryPath = window.location.pathname.match(regexpPath) ? window.location.pathname.match(regexpPath)![0] : '';

    return repositoryPath;
}

interface Location {
  pathname: string;
}

interface State {
  error: null;
  isLoaded: boolean;
  content: string[];
  fileName: string;
  location: string;
};

interface Props {
  location: Location;
}

function requestData (state:{setState: ({}) => void}, repositoryName: string, path: string) {
    let directoryItemInfo: string[] = [];
    fetch(path)
      .then(res => res.json())
      .then(
          (firstResult) => {
            if (firstResult) {
              fetch(`/api/repos/lastcommit/${repositoryName}`)
              .then(res => res.json())
              .then(
                  (secondResult) => {
                    
                    firstResult.forEach((element: string) => {
                      let commitInfo, neededFile;
                      const hasCommitInfo = (item: string) => !!item.match('commitInfo');
    
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


export { getRepositoryNameFromUrl,getPathNameFromUrl, requestData }