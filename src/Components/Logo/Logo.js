import React from 'react';
import logo from './Logotype.svg';
import './Logo.scss';

function Logo() {
    return (
        <div className="logo logo_margin_desktop ">
            <img
            className="logo__image "
            src={logo}
            alt="logotype "
            />
      </div>
    )
}

export default Logo;