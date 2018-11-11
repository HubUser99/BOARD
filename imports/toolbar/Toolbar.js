import React from 'react';

import AccountsUIWrapper from '../ui/AccountsUIWrapper.js';

import DrawerToggleButton from '../sideDrawer/DrawerToggleButton';

import './Toolbar.css';

const toolbar = props => (
    <header className="toolbar">
        <nav className="toolbar_nav">
            <div className="toolbar_toggle-button">
                <DrawerToggleButton click={props.drawerToggleClickHandler} />
            </div>

            <div className="toolbar_logo"><a href="/">BOARD</a></div>

            <div className="spacer"/>

            <div className="toolbar_nav-items">
                <ul>
                    <li className="AUIW"><AccountsUIWrapper /></li>

                    <li><a href="/about">About</a></li>

                    <li><a href="/">Contacts</a></li>
                </ul>
            </div>
        </nav>
    </header>
);

export default toolbar;
