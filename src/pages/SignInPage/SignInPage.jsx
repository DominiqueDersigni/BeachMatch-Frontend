import { Link } from 'react-router-dom';
import React, {useContext} from 'react';
import { AuthContext } from '../../context/AuthContext';

function SignInPage() {
    const { login } = useContext(AuthContext);

    function handleSubmit(e) {
        e.preventDefault();
        login();
    }

    return (
        <>
            <h1>Inloggen</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

            <form onSubmit={handleSubmit}>
                <label>
                    e-mail adres
                    <input type="email" id="emailadres" name="emailadres" />
                </label>
                <label>
                    wachtwoord
                    <input type="password" id="wachtwoord" name="wachtwoord"/>
                </label>
                <button>Inloggen</button>
            </form>

            <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
        </>
    );
}

export default SignInPage;