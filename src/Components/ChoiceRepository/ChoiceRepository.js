import React from 'react';
import arrow from './../../images/arrow.svg';
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

    render() {
        const repositories = this.state.isLoaded && this.state.items.map(item =>
            <li key={item} 
                className="repository-list__repository-name "
                href ="">
                {item}
            </li>
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

