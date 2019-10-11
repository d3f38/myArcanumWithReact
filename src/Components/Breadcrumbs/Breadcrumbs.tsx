import React from 'react';
import './Breadcrumbs.scss';
import { getRepositoryNameFromUrl, getPathNameFromUrl, getBreadcrumbs } from './utils';
import { Link } from 'react-router-dom';

interface State {
	breadcrumbs: string[];
}
interface Props {
	location: string;
}
class Breadcrumbs extends React.Component<{}, State, Props> {
	constructor(props: Props) {
		super(props);
		this.state = {
			breadcrumbs: getBreadcrumbs()
		};
	}
	
	render () {
		const repositoryName = getRepositoryNameFromUrl();
		const pathname = getPathNameFromUrl();

		let href = `/api/repos/${repositoryName}/tree/master/`;
		let newHref = `/api/repos/${repositoryName}/tree/master/`;
		const breadcrumbsArray = this.state.breadcrumbs.map((item, index)=> {
			if (index == 0) href = `/api/repos/${item}/`
			else {
				newHref += item + '/';
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