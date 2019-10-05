import React from 'react';
// import logo from './logo.svg';
import './Breadcrumbs.scss';

function Breadcrumbs() {
    return (
        <div className="breadcrumbs ">
          <a href="# " className="breadcrumbs__link ">
            arcania
          </a>
          <a href="# " className="breadcrumbs__link ">
            arcadia
          </a>
          <a href="# " className="breadcrumbs__link ">
            blob
          </a>
          <a href="# " className="breadcrumbs__link ">
            tree
          </a>
          <a href="# " className="breadcrumbs__link ">
            commit
          </a>
          <a href="# " className="breadcrumbs__link ">
            hash
          </a>
        </div>
    )
}

export default Breadcrumbs;