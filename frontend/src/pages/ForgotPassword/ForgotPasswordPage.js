import React, { Component } from "react";
import styles from "./ForgotPasswordPage.module.css";
import stylesMobile from "./ForgotPasswordMobile.module.css";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
import LogoDesktop from "../../components/LogoDesktop/LogoDesktop";
import LogoMobile from "../../images/logoMobile.svg";
import { requestPasswordReset } from "../../services/api";

// Composant fonctionnel pour passer la fonction navigate
function ForgotPasswordPageWrapper(props) {
    const navigate = useNavigate();
    return <ForgotPasswordPage {...props} navigate={navigate} />;
}

class ForgotPasswordPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            error: "",
            success: "",
        };
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
        const { email } = this.state;

        requestPasswordReset({ to: email }, (error, data) => {
            if (error) {
                this.setState({
                    error: "Erreur lors de l'envoi. Vérifiez l'email.",
                });
            } else {
                this.setState({
                    success: "Lien de réinitialisation envoyé par email.",
                });
            }
        });
        // ajotuer une redirection après 2.5 secondes
        setTimeout(() => {
            this.props.navigate("/login");
        }, 2500);
    }

    render() {
        const { error, success } = this.state;

        return (
            <>
                {isMobile ? (
                    <>
                        <div className={stylesMobile.container}>
                            <div className={stylesMobile.logoContainer}>
                                <LogoDesktop />
                            </div>
                            <div className={stylesMobile.formCard}>
                                <h2 className={stylesMobile.titleCard}>
                                    Mot de passe oublié
                                </h2>
                                <form
                                    className={stylesMobile.formElements}
                                    onSubmit={this.handleSubmit}
                                >
                                    <div className={stylesMobile.inputGroup}>
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.handleChange}
                                            required
                                        />
                                    </div>
                                    {error && (
                                        <p className={stylesMobile.error}>
                                            {error}
                                        </p>
                                    )}
                                    {success && (
                                        <p className={stylesMobile.success}>
                                            {success}
                                        </p>
                                    )}
                                    <div
                                        className={stylesMobile.buttonContainer}
                                    >
                                        <button
                                            type="reset"
                                            onClick={this.handleCancel}
                                            className={
                                                stylesMobile.cancelButton
                                            }
                                        >
                                            <i className="fa-solid fa-xmark"></i>{" "}
                                            Annuler
                                        </button>
                                        <button
                                            type="submit"
                                            className={
                                                stylesMobile.submitButton
                                            }
                                        >
                                            <i className="fa-solid fa-check"></i>{" "}
                                            Réinitialiser
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={styles.container}>
                            <LogoDesktop />
                            <div className={styles.loginFormCard}>
                                <h2 className={styles.titleCard}>
                                    Mot de passe oublié
                                </h2>
                                <form
                                    className={styles.formElements}
                                    onSubmit={this.handleSubmit}
                                >
                                    <div className={styles.labelInput}>
                                        <label htmlFor="email">Email :</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.handleChange}
                                            required
                                        />
                                    </div>
                                    {error && (
                                        <span className={styles.error}>
                                            {error}
                                        </span>
                                    )}
                                    {success && (
                                        <span className={styles.success}>
                                            {success}
                                        </span>
                                    )}
                                    <div className={styles.buttonPosition}>
                                        <button
                                            type="reset"
                                            onClick={this.handleCancel}
                                            className={styles.cancelButton}
                                        >
                                            <i className="fa-solid fa-arrow-left"></i>{" "}
                                            Retour
                                        </button>
                                        <button
                                            type="submit"
                                            className={styles.submitButton}
                                        >
                                            <i className="fa-solid fa-paper-plane"></i>{" "}
                                            Réinitialiser le mot de passe
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </>
                )}
            </>
        );
    }
}

export default ForgotPasswordPageWrapper;
