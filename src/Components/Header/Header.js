import React from 'react';
import Logo from '../Logo/Logo';
import ChoiceRepository from '../ChoiceRepository/ChoiceRepository';
import './Header.scss';

function Header() {
    return (
        <div className="header padding_default ">
            <Logo />
            <ChoiceRepository />
        </div>
    )
}

export default Header;