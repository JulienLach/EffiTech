import React from 'react';
import Header from '../.././components/Header/Header';

const createAccountPage = () => {
    return (
        <div>
        <Header />
        <h1>Créer mon compte</h1>
        <form>
            <label htmlFor="lastname">Nom:</label>
            <input type="text" id="lastname" name="lastname" />
            <br />
            <label htmlFor="firstname">Prénom:</label>
            <input type="text" id="firstname" name="firstname" />
            <br />
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" name="email" />
            <br />
            <label htmlFor="phone_number">Téléphone:</label>
            <input type="number" id="phone_number" name="phone_number" />
            <br />
            <label htmlFor="phone_number">Mot de passe:</label>
            <input type="number" id="phone_number" name="phone_number" />
            <br />
            <button type="submit">Créer mon compte</button>
            <button type="reset">Annuler</button>
        </form>
    </div>
    );
};

export default createAccountPage;