import React from 'react';
import './DirectoryContent.scss';

let repositoryName = window.location.pathname.match(/(?<=\/api\/repos\/)[^\/]+/) ? window.location.pathname.match(/(?<=\/api\/repos\/)[^\/]+/)[0] : '';

class DirectoryContent extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          error: null,
          isLoaded: false,
          repository: repositoryName,
          lastCommitInfo: '',
          items: []
      };
  }
  
  componentDidMount() {
    
      let directoryItemInfo = [];
      fetch(`/api/repos/${repositoryName}`)
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
                    
                    this.setState({
                        isLoaded: true,
                        repository: repositoryName,
                        items: firstResult,
                        lastCommitInfo: directoryItemInfo
                    });
                    console.log(this.state)
                  },
                  (error) => {
                    this.setState({
                        isLoaded: true,
                        repository: repositoryName,
                        error
                    });
                  }
              )
            }
          },
          (error) => {
            this.setState({
                isLoaded: true,
                repository: repositoryName,
                error
            });
          }
      )
  }

  componentDidUpdate(prevProps) {

    const locationChanged = this.props.location !== prevProps.location;
    if (locationChanged) {
      this.state.repository = window.location.pathname.match(/(?<=\/api\/repos\/)[^\/]+/)[0];
      //this.setState({repository: window.state.repository})
      let directoryItemInfo = [];
      fetch(`/api/repos/${this.state.repository}`)
      .then(res => res.json())
      .then(
        (firstResult) => {
          if (firstResult) {
                 
            fetch(`/api/repos/lastcommit/${this.state.repository}`)
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
                  
                  

                  this.setState({
                      isLoaded: true,
                      repository: this.state.repository,
                      items: firstResult,
                      lastCommitInfo: directoryItemInfo
                  });
                },
                (error) => {
                  this.setState({
                      isLoaded: true,
                      repository: this.state.repository,
                      error
                  });
                }
            )
          }
        },
        (error) => {
          this.setState({
              isLoaded: true,
              repository: this.state.repository,
              error
          });
        }
      )
    }
  }

  render () {
    let details = '';
    if (this.state.isLoaded && this.state.lastCommitInfo) {
      details = this.state.lastCommitInfo.map(item => {
        const detailsArray = item.split('/');
        const detailsName = detailsArray[0];
        const detailsCommit = detailsArray[1];
        const detailsMessage = detailsArray[2];
        const detailsCommiter = detailsArray[3];
        const detailsDate = detailsArray[4];

        const isFile = item => !!item.match(/\./);
        let iconClass = 'icon icon_folder icon_margin_right ';
        
        if (isFile(detailsName)) iconClass = 'icon icon_script icon_margin_right '

        return (
          <div className="directory-content-details__item " key={detailsName}>
            <div className="directory-content-details__name ">
              <span className={iconClass} />{detailsName}
            </div>
            <div className="directory-content-details__last-commit ">{detailsCommit}</div>
            <div className="directory-content-details__commit-message ">
            {detailsMessage}
            </div>
            <div className="directory-content-details__committer ">
              <span>{detailsCommiter}</span>
            </div>
            <div className="directory-content-details__date ">{detailsDate}</div>
          </div>  
        )
      });
    } else {
      details = 
        <div className="directory-content-details__item ">
            Directory is empty..
         </div>
    }
    

    return (

      <div className="directory-content ">
          <div className="directory-content-tabs ">
            <span className="directory-content-tabs__tab directory-content-tabs__tab_active ">
              files
            </span>
            <span className="directory-content-tabs__tab ">branches</span>
          </div>
          
          <div className="directory-content-details ">
            <div className="directory-content-details__item directory-content-details__item_header ">
              <div className="directory-content-details__name ">Name</div>
              <div className="directory-content-details__last-commit ">
                Last commit
              </div>
              <div className="directory-content-details__commit-message ">
                Commit message
              </div>
              <div className="directory-content-details__committer ">Committer</div>
              <div className="directory-content-details__date ">Updated</div>
            </div>
              {details}
            </div>
        </div>
    )
  }

}

export default DirectoryContent;