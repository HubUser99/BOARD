import React from 'react'

import './SideDrawer.css'

const sideDrawer = props => {
    let drawerClasses = 'side-drawer';

    //change class of the sideDrawer if open
    if (props.show) {
        drawerClasses = 'side-drawer open';
    }

    return (
        <nav className={drawerClasses}>
            <ul>
                <li><a href='/'>About</a></li>
                <li><a href='/'>Contacts</a></li>
            </ul>
        </nav>
    );
};

export default sideDrawer;
