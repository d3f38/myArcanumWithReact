import React from 'react';
import arrow from './../../images/arrow.svg';
//import { browserHistory } from 'react-router';
import { Link } from 'react-router-dom'
import './ChoiceRepository.scss';

const regexpRepository = new RegExp ('(?<=\/api\/repos\/)[^\/]+');
let repositoryName = window.location.pathname.match(regexpRepository) ? window.location.pathname.match(regexpRepository)![0] : '';

interface Location {
    pathname: string;
}

interface State {
    error: null;
    isLoaded: boolean;
    items: string[];
    selected: string;
    location: string;
};

interface Props {
    location: Location;
}

class ChoiceRepository extends React.Component<Props, State> {
    constructor(props: {location: Location}) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            selected: repositoryName,
            location: ''
        };
    }
    
    componentDidMount() {
        fetch("/api/repos")
        .then(res => res.json())
        .then(
            (result) => {
            this.setState({
                isLoaded: true,
                items: result
            });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }

    componentDidUpdate(prevProps: {location: Location}) {
		const locationChanged = this.props.location !== prevProps.location;

		if (locationChanged) {
            let currentRepository = document.querySelector('.current-repository__name');
            currentRepository!.textContent = this.state.selected;
        }
    }

    selectRepo (item: string) {
        this.setState({
            selected: item
        })
    }

    render() {
        const repositories = this.state.isLoaded && this.state.items.map(item => {
            const href = `/api/repos/${item}`;
            return (
                <li key={item} 
                    className="repository-list__repository-name ">
                    <Link to={href} onClick={() => this.selectRepo(item)}>{item}</Link>
                    {/* <a href={href}>{item}</a> */}
                </li>
            )
        });
        
        return(
            <div className="choice-repository ">
                <div className="current-repository ">
                    <span className="current-repository__title ">Repository</span>
                    <span className="current-repository__name ">{this.state.selected}</span>
                </div>
                <img className="icon icon-arrow icon_margin_left " src={arrow} alt="arrow"/>
                <ul className="repository-list ">
                    {repositories}
                </ul>
            </div>
        )
    }
}

export default ChoiceRepository;

