import React from 'react';
import arrow from './../../images/arrow.svg';
//import { browserHistory } from 'react-router';
import { Link } from 'react-router-dom'
import './ChoiceRepository.scss';

class ChoiceRepository extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
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

    handleClick(item) {
        //browserHistory.push(`/api/repos/${item}`)
    }

    render() {
        const repositories = this.state.isLoaded && this.state.items.map(item => {
            const href = `/api/repos/${item}`;
            return (
                <li key={item} 
                    className="repository-list__repository-name "
                    href ="">
                    <Link to={href} onClick={() => this.handleClick(item)}>{item}</Link>
                    {/* <a href={href}>{item}</a> */}
                </li>
            )
            
        }
            
        );

        return(
            <div className="choice-repository ">
                <div className="current-repository ">
                    <span className="current-repository__title ">Repository</span>
                    <span className="current-repository__name ">Arc</span>
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

