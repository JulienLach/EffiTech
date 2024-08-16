import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const LoginPage = () => {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
      event.preventDefault();
      navigate('/dashboard');
    };
return (
    <div>
        <Header />
        <h1>Se connecter</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" name="email" />
            <br />
            <label htmlFor="password">Mot de passe:</label>
            <input type="password" id="password" name="password" />
            <a href="/forgot-password">Mot de passe oublié ?</a>
            <br />
            <button type="submit" onClick={() => window.location.href = "/dashboard"}>Se connecter</button>
            <p>Pas encore de compte ? <a href="/create-account">Je créer mon compte</a></p>
        </form>
    </div>
);
};

export default LoginPage;