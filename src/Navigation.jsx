import React from 'react';
import {NavLink} from 'react-router-dom';
import logo from './assets/logo.svg';
import './App.css'

function Navigation() {
    return (
        <nav className="navigation-bar">
            <NavLink className = "navigation-logo" to="/">
                <img src={logo} alt="BeachMatch logo"/>
            </NavLink>
            <ul className="navigation-middle">
                <li><NavLink to="/beaches">beaches</NavLink></li>
                <li><NavLink to="/todaysmatch">today's match</NavLink></li>
            </ul>
            <NavLink className = "navigation-profile" to="/profile">
                Profile
            </NavLink>
        </nav>
    )
}

export default Navigation;



