import React, { Component } from "react";
import { isMobile } from "react-device-detect";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./ParametersPage.module.css";
import TemplateGlobal from "../Template/TemplateGlobal";
import TemplateGlobalMobile from "../Template/TemplateGlobalMobile";

// Composant wrapper pour utiliser les hooks
function ParametersPageWrapper() {
    const navigate = useNavigate();
    const location = useLocation();
    return <ParametersPage navigate={navigate} location={location} />;
}

class ParametersPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        return (
            <>
                <TemplateGlobal />
                <div className={styles.container}>
                    <h1 className={styles.pageTitle}>Paramètres</h1>
                    <div className={styles.divider}></div>
                    <div className={styles.cardContainer}>
                        <div className={styles.card}>
                            <h2 className={styles.cardTitle}>
                                <i class="fa-solid fa-wrench"></i> Métiers
                            </h2>
                            <p>Modifier vos métiers</p>
                            <button className={styles.modifyButton}>
                                <i class="fa-solid fa-pen"></i> Modifier
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default ParametersPageWrapper;
