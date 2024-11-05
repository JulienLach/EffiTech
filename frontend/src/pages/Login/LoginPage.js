import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import styles from "./Login.module.css";
import stylesMobile from "./LoginMobile.module.css";
import LogoDesktop from "../../components/LogoDesktop/LogoDesktop";
import LogoMobile from "../../images/logoMobile.svg";
import { loginEmployee } from "../../services/api";

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            redirect: false,
            error: null,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { email, password } = this.state;

        loginEmployee({ email, password }, (error, result) => {
            if (error) {
                this.setState({ error: error.message });
            } else {
                this.setState({ redirect: true });
            }
        });
    }

    render() {
        const isMobile = window.navigator.userAgentData;

        if (this.state.redirect) {
            return <Navigate to="/calendar" />;
        }

        return (
            <>
                {isMobile.mobile ? (
                    <>
                        <div className={stylesMobile.container}>
                            <img
                                className={stylesMobile.logoMobile}
                                src={LogoMobile}
                                alt="Logo"
                            />
                            <form
                                onSubmit={this.handleSubmit}
                                className={stylesMobile.formElements}
                            >
                                <div className={stylesMobile.labelInput}>
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className={stylesMobile.labelInput}>
                                    <label htmlFor="password">
                                        Mot de passe:
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                {this.state.error && (
                                    <p className={stylesMobile.error}>
                                        {this.state.error}
                                    </p>
                                )}
                                <a href="/forgot-password">
                                    Mot de passe oublié ?
                                </a>
                                <button
                                    type="submit"
                                    className={stylesMobile.submitButton}
                                >
                                    Se connecter
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={styles.container}>
                            <LogoDesktop />
                            <div className={styles.loginFormCard}>
                                <h1 className={styles.titleCard}>
                                    Se connecter
                                </h1>
                                <form
                                    onSubmit={this.handleSubmit}
                                    className={styles.formElements}
                                >
                                    <div className={styles.labelInput}>
                                        <label htmlFor="email">Email:</label>
                                        <input
                                            type="text"
                                            id="email"
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className={styles.labelInput}>
                                        <label htmlFor="password">
                                            Mot de passe:
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    {this.state.error && (
                                        <p className={styles.error}>
                                            {this.state.error}
                                        </p>
                                    )}
                                    <a href="/forgot-password">
                                        Mot de passe oublié ?
                                    </a>
                                    <button
                                        type="submit"
                                        className={styles.submitButton}
                                    >
                                        Se connecter
                                    </button>
                                    <p>
                                        Pas encore de compte ?{" "}
                                        <a href="/create-account">
                                            Je créer mon compte
                                        </a>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </>
                )}
            </>
        );
    }
}

export default LoginPage;
