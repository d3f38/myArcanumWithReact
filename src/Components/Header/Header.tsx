import React from 'react';
import Logo from '../Logo/Logo';
import ChoiceRepository from '../ChoiceRepository/ChoiceRepository';
import './Header.scss';

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

function Header() {
    return (
        <div className="header padding_default ">
            <Logo />
            <ChoiceRepository location={{pathname: ''}}/>
        </div>
    )
}

export default Header;