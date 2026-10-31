import React from 'react';
import { Link } from 'react-router-dom';

function RegisterPage() {


    return (
        <>
            <h1>Registreren</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque eligendi
                harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur deserunt
                doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
            <form>
                <label>
                    username
                    <input type="text" id="username" name="username" />
                </label>
                <label>
                    email
                    <input type="email" id="emailadres" name="emailadres" />
                </label>
                <label>
                    password
                    <input type="password" id="wachtwoord" name="wachtwoord"/>
                </label>
                <button>Registreren</button>
            </form>
            <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
        </>
    );
}

export default RegisterPage;