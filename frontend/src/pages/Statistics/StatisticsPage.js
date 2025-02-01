import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import TemplateGlobal from "../Template/TemplateGlobal";
import styles from "./StatisticsPage.module.css";
import { getAllEventStatistics } from "../../services/api";

// Composant fonctionnel wrapper
const CompanyPageWrapper = () => {
    const navigate = useNavigate();
    return <StatisticsPage navigate={navigate} location={location} />;
};

class StatisticsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        getAllEventStatistics((error, data) => {
            if (error) {
                this.setState({ error: error.message });
            } else {
                this.setState({
                    events: data,
                });
            }
        });
    }

    render() {
        return (
            <>
                <TemplateGlobal />
                <div className={styles.container}>
                    <h1 className={styles.pageTitle}>Statistiques</h1>
                </div>
                <div className={styles.container}>
                    <h3>
                        Nombre total d'événements :{" "}
                        {this.state.events?.totalEvents}
                    </h3>
                </div>
            </>
        );
    }
}

export default CompanyPageWrapper;
