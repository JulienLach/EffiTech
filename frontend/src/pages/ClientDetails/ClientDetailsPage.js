import React, { Component } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TemplateGlobal from "../Template/TemplateGlobal";
import styles from "./ClientDetailsPage.module.css";

// Composant wrapper pour utiliser les hooks
function ClientDetailsPageWrapper() {
    const navigate = useNavigate();
    const location = useLocation();
    return <ClientDetailsPage navigate={navigate} location={location} />;
}

class ClientDetailsPage extends Component {
    render() {
        return (
            <>
                <TemplateGlobal />
                <div className={styles.container}></div>
            </>
        );
    }
}

export default ClientDetailsPageWrapper;
