import React, { Component } from "react";
import styles from "./ResetPasswordPage.module.css"; // Créez ce fichier CSS
import { useNavigate, useLocation } from "react-router-dom";
import LogoDesktop from "../../components/LogoDesktop/LogoDesktop";
import { resetPassword } from "../../services/api";

// Composant fonctionnel pour passer navigate et location
function ResetPasswordPageWrapper(props) {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <ResetPasswordPage {...props} navigate={navigate} location={location} />
    );
}

class ResetPasswordPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPassword: "",
            confirmPassword: "",
            error: "",
            success: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
            error: "",
            success: "",
        });
    }

    handleCancel(event) {
        event.preventDefault();
        this.props.navigate("/login");
    }

    handleSubmit(event) {
        event.preventDefault();
        const { newPassword, confirmPassword } = this.state;

        // Validation
        if (newPassword !== confirmPassword) {
            this.setState({ error: "Les mots de passe ne correspondent pas." });
            return;
        }
        if (!newPassword) {
            this.setState({ error: "Le mot de passe est requis." });
            return;
        }

        // Extraction du token et de l'email depuis l'URL
        const params = new URLSearchParams(this.props.location.search);
        const token = params.get("token");
        const email = params.get("email");

        const passwordData = {
            email,
            token,
            newPassword,
        };

        resetPassword(passwordData, (error, data) => {
            if (error) {
                this.setState({
                    error: "Lien invalide ou expiré. Essayez à nouveau.",
                });
            } else {
                this.setState({
                    success: "Mot de passe réinitialisé. Redirection...",
                });
                setTimeout(() => this.props.navigate("/login"), 2000);
            }
        });
    }

    render() {
        const { error, success } = this.state;

        return (
            <div className={styles.container}>
                <LogoDesktop />
                <div className={styles.loginFormCard}>
                    <h2 className={styles.titleCard}>
                        Réinitialiser le mot de passe
                    </h2>
                    <form
                        className={styles.formElements}
                        onSubmit={this.handleSubmit}
                    >
                        <div className={styles.labelInput}>
                            <label htmlFor="newPassword">
                                Nouveau mot de passe :
                            </label>
                            <input
                                type="password"
                                name="newPassword"
                                value={this.state.newPassword}
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <div className={styles.labelInput}>
                            <label htmlFor="confirmPassword">
                                Confirmer le mot de passe :
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={this.state.confirmPassword}
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        {error && <span className={styles.error}>{error}</span>}
                        {success && (
                            <span className={styles.success}>{success}</span>
                        )}
                        <div className={styles.buttonPosition}>
                            <button
                                type="reset"
                                onClick={this.handleCancel}
                                className={styles.cancelButton}
                            >
                                <i className="fa-solid fa-xmark"></i> Annuler
                            </button>
                            <button
                                type="submit"
                                className={styles.submitButton}
                            >
                                <i className="fa-solid fa-check"></i>{" "}
                                Réinitialiser
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default ResetPasswordPageWrapper;
