import React from 'react';
import './Footer.scss';

function Footer() {
    return (
        <div className="footer ">
            <span className="footer__contacts ">
                Trade secrets of Yandex LLC. 16, Lev Tolstoy Str., Moscow, Russia, 119021
            </span>
            <span className="footer__data ">
                <span className="footer__ui-version ">UI: 0.1.15</span>
                <span className="footer__copyright ">
                    © 2007—2019{" "}
                    <a href="https://yandex.ru " className="footer__link ">
                    Yandex
                    </a>
                </span>
            </span>
        </div>

    )
}

export default Footer;