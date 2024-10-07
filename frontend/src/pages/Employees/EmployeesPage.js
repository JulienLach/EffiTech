import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import TemplateGlobal from "../Template/TemplateGlobal";
import styles from "./EmployeesPage.module.css";
import profilPicture from "../../images/profil.png";

// Composant fonctionnel wrapper
const EmployeesPageWrapper = () => {
    const navigate = useNavigate();
    return <EmployeesPage navigate={navigate} />;
};

class EmployeesPage extends Component {
    constructor(props) {
        super(props);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    handleButtonClick() {
        this.props.navigate("/employee-details");
    }

    render() {
        return (
            <>
                <TemplateGlobal />
                <div className={styles.container}>
                    <div className={styles.card}>
                        <div className={styles.profilPicture}>
                            <img src={profilPicture} alt="Profil picture" />
                        </div>
                        <div className={styles.profilInfo}>
                            <p
                                className={`${styles.lastname} ${styles.firstname}`}
                            >
                                [lastname][firstname]
                            </p>
                            <p className={styles.job}>[Menuisier]</p>
                            <p className={styles.info}>[phone]</p>
                            <p className={styles.info}>[mail]</p>
                            <div className={styles.moreInfo}>
                                <button
                                    type="submit"
                                    onClick={this.handleButtonClick}
                                >
                                    Consulter la fiche
                                </button>
                                <i class="fa-solid fa-arrow-right"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default EmployeesPageWrapper;
