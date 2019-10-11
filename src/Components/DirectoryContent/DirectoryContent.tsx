import React from 'react';
import { Link } from 'react-router-dom'
import './DirectoryContent.scss';
const { requestData, getRepositoryNameFromUrl, getPathNameFromUrl } = require('./utils.js');

let repositoryName = getRepositoryNameFromUrl();

interface Location {
    pathname: string;
}

interface State {
    error: null;
    isLoaded: boolean;
    items: string[];
	location: string;
	repository: string;
	lastCommitInfo: string[];
};

interface Props {
    location: Location;
}


class DirectoryContent extends React.Component<Props, State> {
	constructor(props: {location: Location}) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			repository: repositoryName,
			lastCommitInfo: [],
			location:  window.location.pathname,
			items: []
		};
	}

	componentDidMount() {
		const context = this;
		requestData(context, repositoryName, this.state.location)
	}

	componentDidUpdate(prevProps: {location: Location}) {
		const locationChanged = this.props.location !== prevProps.location;

		if (locationChanged) {
			const context = this;
			requestData(context, this.state.repository, this.props.location.pathname)
		}
	}

	handleClick(item: string) {
        this.setState({
			location: item
		})
    }

	render () {
		let details: JSX.Element[] | JSX.Element;
		if (!this.state.isLoaded) {
			details = 
				<div className="directory-content-details__item_loading">
					Loading..
				</div>
		} else if (this.state.isLoaded && this.state.lastCommitInfo.length) {
			repositoryName = getRepositoryNameFromUrl()
			const pathName = getPathNameFromUrl();
			

			details = this.state.lastCommitInfo.map(function(item: string) {
				const detailsArray = item.split('/');
				const detailsType = detailsArray[0];
				const detailsName = detailsArray[1];
				const detailsCommit = detailsArray[2];
				const detailsMessage = detailsArray[3];
				const detailsCommiter = detailsArray[4];
				const detailsDate = detailsArray[5];

				const isFile = (item: string) => !!item.match(/\./);
				let iconClass = 'icon icon_folder icon_margin_right ';
				let href = pathName ? `/api/repos/${repositoryName}/tree/master/${pathName}/` : `/api/repos/${repositoryName}/tree/master/`;
			
				if (detailsType !== 'folder') {
					iconClass = 'icon icon_script icon_margin_right ';

					href = `/api/repos/${repositoryName}/blob/master/${pathName}/`;
				}
				if (detailsType === 'md') iconClass = 'icon icon_markdown icon_margin_right ';

				return (
					<div className="directory-content-details__item " key={detailsName}>
						<div className="directory-content-details__name ">
							<Link to={href + detailsName} className="directory-content-details__name_link "><span className={iconClass} />{detailsName}</Link>
						</div>
						<div className="directory-content-details__last-commit ">
							{detailsCommit}
						</div>
						<div className="directory-content-details__commit-message ">
							{detailsMessage}
						</div>
						<div className="directory-content-details__committer ">
							<span>{detailsCommiter}</span>
						</div>
						<div className="directory-content-details__date ">
							{detailsDate}
						</div>
					</div>  
				)
			});
		} else {
			details = 
				<div className="directory-content-details__item directory-content-details__item_empty">
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