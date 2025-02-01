// filepath: /home/julien/Documents/EffiTech/frontend/src/pages/Statistics/StatisticsPage.js
import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import TemplateGlobal from "../Template/TemplateGlobal";
import styles from "./StatisticsPage.module.css";
import { getAllEventStatistics } from "../../services/api";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

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

    countEventsByTypeAndMonth(type) {
        const currentMonth = new Date().getMonth() + 1; //en js les mois commencent à 0 jusqu'à 11
        return (
            this.state.events?.events.filter(
                (event) =>
                    event.type === type &&
                    new Date(event.startingDate).getMonth() + 1 === currentMonth
            ).length || 0
        );
    }

    getCurrentMonthName() {
        return new Date().toLocaleString("fr-FR", { month: "long" });
    }

    render() {
        const totalInterventions =
            this.countEventsByTypeAndMonth("Intervention");
        const totalRendezVous = this.countEventsByTypeAndMonth("Rendez-vous");

        const chartData = {
            labels: ["Interventions", "Rendez-vous"],
            datasets: [
                {
                    data: [totalInterventions, totalRendezVous],
                    backgroundColor: [
                        "rgba(187, 12, 12, 0.6)",
                        "rgba(134, 134, 134, 0.6)",
                    ],
                },
            ],
        };

        return (
            <>
                <TemplateGlobal />
                <div className={styles.container}>
                    <h1 className={styles.pageTitle}>Statistiques</h1>
                </div>
                <div className={styles.container}>
                    <div className={styles.eventCard}>
                        <h3>
                            Total d'événements en {this.getCurrentMonthName()} :{" "}
                            {this.state.events?.totalEvents}
                        </h3>
                        <p className={styles.labelStats}>
                            Nombre d'interventions : {totalInterventions}
                        </p>
                        <p className={styles.labelStats}>
                            Nombre de rendez-vous : {totalRendezVous}
                        </p>
                        <div className={styles.eventChart}>
                            <Pie data={chartData} />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default CompanyPageWrapper;
