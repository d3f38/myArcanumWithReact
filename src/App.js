import React, {lazy, Suspense} from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.scss';

import Header from './Components/Header/Header';
import Breadcrumbs from './Components/Breadcrumbs/Breadcrumbs';
import DirectoryInfo from './Components/DirectoryInfo/DirectoryInfo';
import DirectoryContent from './Components/DirectoryContent/DirectoryContent';
import Markdown from './Components/Markdown/Markdown';
import Footer from './Components/Footer/Footer';
//const DirectoryContent = lazy(() => import('./Components/DirectoryContent/DirectoryContent'));



class App extends React.Component {

	componentDidMount(){
		window.state = {
			repository: '',
			file: ''
		}
	}
	
	render () {
		return (
			<div className="theme-repository ">
				<Header/>
				
				<div className="main-content main-content_repository">
					<Breadcrumbs />
					<DirectoryInfo />
					<Switch>
						<Route exact path='/' component={DirectoryContent}/>
						<Route path='/api/repos/:repositoryId' component={DirectoryContent}/>
						<Route path='/api/repos/:repositoryId/tree/:commitHash/:path([^/]*)?' component={DirectoryContent}/>
						/api/repos/:repositoryId/blob/:commitHash/:pathToFile([^/]*)?
					</Switch>
						
					
					<Markdown />
				</div>
				<Footer />
			</div>
		);
	}
}

export default App;
