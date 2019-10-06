import React from 'react';
import './Breadcrumbs.scss';
import { getRepositoryNameFromUrl, getPathNameFromUrl, getBreadcrumbs } from './utils';
import { Link } from 'react-router-dom';

console.log(getBreadcrumbs())
class Breadcrumbs extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			breadcrumbs: getBreadcrumbs()
		};
	}
	
	componentDidMount() {
		this.setState = {
			breadcrumbs: getBreadcrumbs()
		};
	}

	componentDidUpdate(prevProps) {
		const locationChanged = this.props.location !== prevProps.location;

		if (locationChanged) {
			console.log(2)
			this.setState = {
				breadcrumbs: getBreadcrumbs()
			};
		}
	}
	render () {
		const repositoryName = getRepositoryNameFromUrl();
		const pathname = getPathNameFromUrl();

		let href = `/api/repos/${repositoryName}/tree/master/`;
		let newHref = '';
		const breadcrumbsArray = this.state.breadcrumbs.map((item, index)=> {
			if (index == 0) href = `/api/repos/${item}`
			else {
				href += item + '/';
			}

			return (
				<Link to={href} className="breadcrumbs__link" key={item}>{item}</Link>	
			)
		})

		return (
			<div className="breadcrumbs ">
				{breadcrumbsArray}
			</div>
		)
	}
	
}

export default Breadcrumbs;