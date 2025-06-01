import React, { Component } from "react";
import styles from "./ClientForm.module.css";
import { createClient } from "../../services/api";

class ClientForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            category: "Particulier",
            company: "",
            errors: {},
        };
        this.handleModalCategoryChange =
            this.handleModalCategoryChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getCategoryIndicator(category) {
        const style = {
            padding: "2px 10px",
            borderRadius: "8px",
            color: "white",
            fontSize: "0.9em",
            fontWeight: "500",
        };

        switch (category) {
            case "Professionnel":
                return (
                    <span
                        style={{
                            ...style,
                            backgroundColor: "#C1F0FF",
                            color: "#2C5BA1",
                        }}
                    >
                        Professionnel
                    </span>
                );
            case "Particulier":
                return (
                    <span
                        style={{
                            ...style,
                            backgroundColor: "#FFE4BC",
                            color: "#C35E00",
                        }}
                    >
                        Particulier
                    </span>
                );
            default:
                return null;
        }
    }

    handleModalCategoryChange(event) {
        this.setState({ category: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const data = {
            category: this.state.category,
            company: this.state.company,
            lastname: form.lastname.value,
            firstname: form.firstname.value,
            addressDetails: {
                address: form.address.value,
                zipcode: form.zipcode.value,
                city: form.city.value,
            },
            email: form.mail.value,
            phoneNumber: form.phone.value,
        };
        console.log("Données du formulaire soumises:", data);

        const errors = {};
        if (!data.company && data.category === "Professionnel") {
            errors.company = "* Champ obligatoire";
        }
        if (!data.firstname) {
            errors.firstname = "* Champ obligatoire";
        } else if (!/^[a-zA-ZÀ-ÿ\s-]+$/.test(data.firstname)) {
            errors.firstname =
                "* Ne doit contenir que des lettres et des tirets";
        }
        if (!data.lastname) {
            errors.lastname = "* Champ obligatoire";
        } else if (!/^[a-zA-ZÀ-ÿ\s-]+$/.test(data.lastname)) {
            errors.lastname =
                "* Ne doit contenir que des lettres et des tirets";
        }
        if (!data.addressDetails.address) {
            errors.address = "* Champ obligatoire";
        } else if (!/^[a-zA-ZÀ-ÿ\d\s'-]+$/.test(data.addressDetails.address)) {
            errors.address =
                "* Ne doit contenir que des lettres, des chiffres, des espaces et des tirets";
        }
        if (!data.addressDetails.zipcode) {
            errors.zipcode = "* Champ obligatoire";
        } else if (!/^\d{5}$/.test(data.addressDetails.zipcode)) {
            errors.zipcode = "* Doit contenir exactement 5 chiffres";
        }
        if (!data.addressDetails.city) {
            errors.city = "* Champ obligatoire";
        } else if (!/^[a-zA-ZÀ-ÿ\s-]+$/.test(data.addressDetails.city)) {
            errors.city =
                "* Ne doit contenir que des lettres, des espaces et des tirets";
        }
        if (!data.email) {
            errors.email = "* Champ obligatoire";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            errors.email = "* Adresse email invalide";
        }
        if (!data.phoneNumber) {
            errors.phone = "* Champ obligatoire";
        } else if (!/^[\d\s]+$/.test(data.phoneNumber)) {
            errors.phone = "* Ne doit contenir que des chiffres et des espaces";
        }

        if (Object.keys(errors).length > 0) {
            this.setState({ errors });
            return;
        }

        createClient(data, (error) => {
            if (error) {
                this.setState({ error: error.message });
            } else {
                this.setState({
                    company: "",
                    category: "Particulier",
                });
            }
            window.location.reload();
        });
    }

    render() {
        const { category, company, errors } = this.state;

        return (
            <>
                <h1 className={styles.modalHeader}>Nouveau client</h1>
                <div className={styles.separation}></div>

                <form
                    className={styles.formElements}
                    onSubmit={this.handleSubmit}
                >
                    <div className={styles.selectedCategory}>
                        <label className={styles.labelRadio}>Type :</label>
                        <div>
                            <label className={styles.radioParticulier}>
                                <input
                                    className={styles.radioForm}
                                    type="radio"
                                    name="category"
                                    value="Particulier"
                                    checked={category === "Particulier"}
                                    onChange={this.handleModalCategoryChange}
                                />
                                Particulier
                            </label>
                        </div>
                        <div>
                            <label className={styles.radioProfessionnel}>
                                <input
                                    className={styles.radioForm}
                                    type="radio"
                                    name="category"
                                    value="Professionnel"
                                    checked={category === "Professionnel"}
                                    onChange={this.handleModalCategoryChange}
                                />
                                Professionnel
                            </label>
                        </div>
                    </div>

                    {category === "Professionnel" && (
                        <div className={styles.labelInput}>
                            <label htmlFor="company">
                                Nom de l'entreprise{" "}
                                <span className={styles.required}>*</span> :{" "}
                            </label>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                value={company}
                                onChange={(e) =>
                                    this.setState({
                                        company: e.target.value,
                                    })
                                }
                            />
                            {errors.company && (
                                <span className={styles.error}>
                                    {errors.company}
                                </span>
                            )}
                        </div>
                    )}
                    <div className={styles.labelInput}>
                        <label htmlFor="lastname">
                            Nom <span className={styles.required}>*</span> :
                        </label>
                        <input type="text" id="lastname" name="lastname" />
                        {errors.lastname && (
                            <span className={styles.error}>
                                {errors.lastname}
                            </span>
                        )}
                    </div>
                    <div className={styles.labelInput}>
                        <label htmlFor="firstname">
                            Prénom <span className={styles.required}>*</span> :
                        </label>
                        <input type="text" id="firstname" name="firstname" />
                        {errors.firstname && (
                            <span className={styles.error}>
                                {errors.firstname}
                            </span>
                        )}
                    </div>
                    <div className={styles.labelInput}>
                        <label htmlFor="address">
                            Adresse <span className={styles.required}>*</span> :
                        </label>
                        <input type="text" id="address" name="address" />
                        {errors.address && (
                            <span className={styles.error}>
                                {errors.address}
                            </span>
                        )}
                    </div>
                    <div className={styles.labelInput}>
                        <label htmlFor="zipcode">
                            Code postal{" "}
                            <span className={styles.required}>*</span> :
                        </label>
                        <input type="text" id="zipcode" name="zipcode" />
                        {errors.zipcode && (
                            <span className={styles.error}>
                                {errors.zipcode}
                            </span>
                        )}
                    </div>
                    <div className={styles.labelInput}>
                        <label htmlFor="city">
                            Ville <span className={styles.required}>*</span> :
                        </label>
                        <input type="text" id="city" name="city" />
                        {errors.city && (
                            <span className={styles.error}>{errors.city}</span>
                        )}
                    </div>
                    <div className={styles.labelInput}>
                        <label htmlFor="mail">
                            Email <span className={styles.required}>*</span> :
                        </label>
                        <input type="email" id="mail" name="mail" />
                        {errors.email && (
                            <span className={styles.error}>{errors.email}</span>
                        )}
                    </div>
                    <div className={styles.labelInput}>
                        <label htmlFor="phone">
                            Téléphone <span className={styles.required}>*</span>{" "}
                            :
                        </label>
                        <input type="text" id="phone" name="phone" />
                        {errors.phone && (
                            <span className={styles.error}>{errors.phone}</span>
                        )}
                    </div>
                    <div className={styles.separation}></div>

                    <div className={styles.buttonPosition}>
                        <button
                            type="reset"
                            className={styles.cancelButton}
                            onClick={this.props.onClose}
                        >
                            <i className="fa-solid fa-xmark"></i> Annuler
                        </button>
                        <button type="submit" className={styles.submitButton}>
                            <i className="fa-solid fa-check"></i> Enregister
                        </button>
                    </div>
                </form>
            </>
        );
    }
}

export default ClientForm;
