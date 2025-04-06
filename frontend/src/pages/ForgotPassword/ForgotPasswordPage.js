import React, { Component } from "react";
import styles from "./ForgotPasswordPage.module.css";
import { useNavigate } from "react-router-dom";
import LogoDesktop from "../../components/LogoDesktop/LogoDesktop";
import { sendEmployeeCredentials } from "../../services/api";

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
        this.props.navigate("/login");
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div className={styles.container}>
                <LogoDesktop />
                <div className={styles.loginFormCard}>
                    <h2 className={styles.titleCard}>Mot de passe oublié</h2>
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
                                <i className="fa-solid fa-envelope"></i>{" "}
                                Récupérer mon mot de passe
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default ForgotPasswordPageWrapper;
