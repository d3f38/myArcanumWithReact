import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.scss';

import Header from './Components/Header/Header';
import Breadcrumbs from './Components/Breadcrumbs/Breadcrumbs';
import DirectoryInfo from './Components/DirectoryInfo/DirectoryInfo';
import DirectoryContent from './Components/DirectoryContent/DirectoryContent';
import Markdown from './Components/Markdown/Markdown';
import Footer from './Components/Footer/Footer';

class App extends React.Component {

	render () {
		return (
			<div className="theme-repository ">
				<Header/>
				
				<div className="main-content main-content_repository">
					
					<DirectoryInfo />
					<Route path='/' component={Breadcrumbs}/>
					<Switch>
						<Route exact path='/api/repos' component={DirectoryContent}/>
						<Route exact path='/api/repos/:repositoryId' component={DirectoryContent}/>
						<Route path='/api/repos/:repositoryId/tree/:commitHash/:path([^/]*)?' component={DirectoryContent}/>
						<Route path='/api/repos/:repositoryId/blob/:commitHash/:pathToFile([^/]*)?' component={Markdown}/>
						<Redirect to="/api/repos"/>
					</Switch>
				</div>
				<Footer />
			</div>
		);
	}
}

export default App;
