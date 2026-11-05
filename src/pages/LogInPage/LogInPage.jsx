import {Link} from 'react-router-dom';
import React, {useContext, useState} from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';
import axios from 'axios';

function LogInPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useContext(AuthContext);

    async function handleSubmit(e) {
        e.preventDefault();

        const body = new URLSearchParams({
            grant_type: 'password',
            client_id: 'BeachMatchFrontend',
            username: username,
            password: password,
        });

        try {
            const response = await axios.post(
                'http://localhost:9090/realms/BeachMatch/protocol/openid-connect/token', body,
                { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
            login(response.data.access_token);
            console.log(response.data);

        }
        catch (error) {
            console.log("Wrong username or password");
        }
    }

    return (
        <>
            <h1>Log in</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">
                    Username:
                    <input
                        type="text"
                        name="username-field"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}/>
                </label>
                <label htmlFor="password">
                    Password:
                    <input
                        type="password"
                        name="password-field"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <button type = "submit">Log in</button>
            </form>

            <p>Don't have an account yet? </p> <a href = "http://localhost:9090/realms/BeachMatch/protocol/openid-connect/registrations?client_id=BeachMatchFrontend&response_type=code&redirect_uri=http://localhost:5173/login">Register</a>
        </>
    );
}

export default LogInPage;