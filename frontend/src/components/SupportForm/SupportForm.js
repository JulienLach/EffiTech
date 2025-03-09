import React, { Component } from "react";
import styles from "./SupportForm.module.css";
import { sendEmail } from "../../services/api";

class SupportForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            message: "",
            errors: {},
            showAlert: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { email, message } = this.state;

        const errors = {};
        if (!email) {
            errors.email = "* Champ obligatoire";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "* Adresse email invalide";
        }

        if (!message) {
            errors.message = "* Champ obligatoire";
        }

        if (Object.keys(errors).length > 0) {
            this.setState({ errors });
            return;
        }

        const emailData = {
            to: "support@effitech.ovh", //support email à configurer dans ovh
            subject: "Demande de support",
            text: `De: ${email}\n\nMessage:\n${message}
            Nous avons reçu votre message et nous vous répondrons dans les plus brefs délais.
            Merci de votre confiance.
            `,
        };

        sendEmail(emailData, (error, data) => {
            if (error) {
                console.error(
                    "Erreur lors de l'envoi du message au support",
                    error
                );
            } else {
                console.log("Message envoyé au support", data);
                this.setState({
                    email: "",
                    message: "",
                    errors: {},
                    showAlert: true,
                });
                setTimeout(() => {
                    this.props.closeModal();
                    this.setState({ showAlert: false });
                }, 2500);
            }
        });
    }

    render() {
        const { email, message, errors, showAlert } = this.state;

        return (
            <>
                <div className={styles.modalBackground}></div>
                <form
                    className={`${styles.modal} ${styles.open}`}
                    onSubmit={this.handleSubmit}
                >
                    <div>
                        <h2 className={styles.modalHeader}>
                            Contacter le support
                        </h2>
                    </div>
                    <div className={styles.form}>
                        <div>
                            <label className={styles.formLabel}>
                                Email <span className={styles.required}>*</span>{" "}
                                :
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={this.handleChange}
                            />
                            {errors.email && (
                                <span className={styles.error}>
                                    {errors.email}
                                </span>
                            )}
                        </div>
                        <div>
                            <label className={styles.formLabel}>
                                Message{" "}
                                <span className={styles.required}>*</span> :
                            </label>
                            <textarea
                                className={styles.createEventTextarea}
                                name="message"
                                value={message}
                                onChange={this.handleChange}
                            />
                            {errors.message && (
                                <span className={styles.error}>
                                    {errors.message}
                                </span>
                            )}
                        </div>
                        <div className={styles.modalFooter}>
                            <button
                                type="button"
                                className={styles.cancelButton}
                                onClick={this.props.closeModal}
                            >
                                <i className="fas fa-xmark"></i>
                                Annuler
                            </button>
                            <button
                                type="submit"
                                className={styles.submitButton}
                            >
                                <i className="fas fa-check"></i>
                                Envoyer
                            </button>
                        </div>
                    </div>
                </form>
                {showAlert && (
                    <div className={styles.alert}>
                        Email envoyé <i className="fa-solid fa-check"></i>
                    </div>
                )}
            </>
        );
    }
}

export default SupportForm;
