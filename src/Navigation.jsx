import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import logo from './assets/logo.svg';
import './App.css'
import {AuthContext} from "./context/AuthContext.jsx";
import {useLocation} from "react-router-dom";

function Navigation() {

    const { isAuth, user, logout } = useContext(AuthContext);
    const location = useLocation();

    return (
        <nav className="navigation-bar">
            <NavLink className = "navigation-logo" to="/">
                <img src={logo} alt="BeachMatch logo"/>
            </NavLink>
            <ul className="navigation-middle">
                <li><NavLink to="/beaches">beaches</NavLink></li>
                <li><NavLink to="/todaysmatch">today's match</NavLink></li>
            </ul>
            <div className="navigation-right">
                {isAuth ? (
                    location.pathname === "/profile"? (
                            <button className="navigation-profile" onClick={logout}>Log out</button>
                        ) : (
                        <NavLink className = "navigation-profile" to="/profile">{user.username}</NavLink>
                    )
                    ) : (
                    <NavLink className = "navigation-profile" to="/login">Log in</NavLink>
                     )}
            </div>

        </nav>
    )
}

export default Navigation;



