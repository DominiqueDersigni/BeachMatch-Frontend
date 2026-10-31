import React from 'react';
import {NavLink} from 'react-router-dom';

function Navigation() {
    return (
        <nav className="navigation-bar">
            <ul>
                <li><NavLink to="/">Homepage</NavLink></li>
                <li><NavLink to="/todaysmatch">Today's Match</NavLink></li>
                <li><NavLink to="/beaches">Beaches</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navigation;