import './LogInPage.css';
import React, {useContext, useState} from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';
import axios from 'axios';
import Button from "../../components/Button/Button.jsx";
import logo from "../../assets/logo.svg";

function LogInPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
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
            setError("Wrong username or password");
        }
    }

    return (
        <div className="login-page">
            <section className="login-intro">
                <h1>Your perfect beach is waiting.</h1>
                <p>Log in to see today's best beach, save your favorites and share reviews.</p>
            </section>

            <section className="login-card">
                <img src={logo} alt="BeachMatch logo" className="login-logo"/>
                <form onSubmit={handleSubmit}>
                    <div className="login-form-field">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username-field" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                    </div>
                    <div className="login-form-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password-field" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    {error && <p className="login-error">{error}</p>}
                    <Button type="submit">Log in</Button>
                </form>
                <p className="login-register">
                    Don't have an account yet?{" "}
                    <a href="http://localhost:9090/realms/BeachMatch/protocol/openid-connect/registrations?client_id=BeachMatchFrontend&response_type=code&redirect_uri=http://localhost:5173/login">Create account</a>
                </p>
            </section>
        </div>
    );
}

export default LogInPage;