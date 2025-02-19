import React, { Component } from "react";
import GlobalStyles from "../../styles/GlobalStyles.module.css";
import styles from "./CreateAccount.module.css";
import { useNavigate } from "react-router-dom";
import LogoDesktop from "../../components/LogoDesktop/LogoDesktop";
import { createAccount } from "../../services/api";

// Composant fonctionnel pour passer la fonction navigate
function CreateAccountPageWrapper(props) {
    const navigate = useNavigate();
    return <CreateAccountPage {...props} navigate={navigate} />;
}

class CreateAccountPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastname: "",
            firstname: "",
            email: "",
            phoneNumber: "",
            password: "",
            job: "",
            speciality: "",
        };
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });
    }

    handleCancel(event) {
        event.preventDefault();
        window.location.href = "/login";
    }

    handleSubmit(event) {
        event.preventDefault();
        const {
            firstname,
            lastname,
            email,
            phoneNumber,
            password,
            job,
            speciality,
        } = this.state;

        const employeeData = {
            firstname,
            lastname,
            email,
            phoneNumber,
            password,
            job: "",
            isAdmin: false,
            speciality: "",
        };

        createAccount(employeeData, (error, newAccount) => {
            if (error) {
                console.error("Erreur lors de la création du compte", error);
            } else {
                console.log("Compte créé avec succès, ID:", newAccount.id);
                this.props.navigate("/login");
            }
        });
    }

    render() {
        return (
            <div className={styles.container}>
                <LogoDesktop />
                <div className={styles.loginFormCard}>
                    <h2 className={styles.titleCard}>Créer mon compte</h2>
                    <form
                        className={styles.formElements}
                        onSubmit={this.handleSubmit}
                    >
                        <div className={styles.labelInput}>
                            <label htmlFor="lastname">Nom :</label>
                            <input
                                type="text"
                                name="lastname"
                                value={this.state.lastname}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="firstname">Prénom :</label>
                            <input
                                type="text"
                                name="firstname"
                                value={this.state.firstname}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="email">Email :</label>
                            <input
                                type="text"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="phoneNumber">Téléphone :</label>
                            <input
                                type="number"
                                name="phoneNumber"
                                value={this.state.phoneNumber}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="password">Mot de passe :</label>
                            <input
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className={styles.buttonPosition}>
                            <button
                                type="reset"
                                onClick={this.handleCancel}
                                className={styles.cancelButton}
                            >
                                <i class="fa-solid fa-xmark"></i>
                                {""}
                                Annuler
                            </button>
                            <button
                                type="submit"
                                className={styles.submitButton}
                            >
                                <i class="fa-solid fa-check"></i> Créer mon
                                compte
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateAccountPageWrapper;
