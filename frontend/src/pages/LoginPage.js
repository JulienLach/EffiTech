import React from 'react';
import Header from '../components/Header';

const LoginPage = () => {
return (
    <div>
        <Header />
        <h1>Se connecter</h1>
        <form>
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" name="email" />
            <br />
            <label htmlFor="password">Mot de passe:</label>
            <input type="password" id="password" name="password" />
            <a href="/forgot-password">Mot de passe oublié ?</a>
            <br />
            <button type="submit">Se connecter</button>
            <p>Pas encore de compte ? <a href="/register">Je créer mon compte</a></p>
        </form>
    </div>
);
};

export default LoginPage;