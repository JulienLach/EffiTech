import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import TemplateGlobal from "../Template/TemplateGlobal";
import styles from "./StatisticsPage.module.css";
import { getAllEventStatistics } from "../../services/api";
import { Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";

const StatisticsPageWrapper = () => {
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

    countEventsByEmployeeAndMonth() {
        const currentMonth = new Date().getMonth() + 1;
        const employeeEventCount = {};

        this.state.events?.events.forEach((event) => {
            if (new Date(event.startingDate).getMonth() + 1 === currentMonth) {
                const employeeName = `${event.employee.firstname} ${event.employee.lastname}`;
                if (!employeeEventCount[employeeName]) {
                    employeeEventCount[employeeName] = 0;
                }
                employeeEventCount[employeeName]++;
            }
        });
        return employeeEventCount;
    }

    getCurrentMonthName() {
        return new Date().toLocaleString("fr-FR", { month: "long" });
    }

    render() {
        const totalInterventions =
            this.countEventsByTypeAndMonth("Intervention");
        const totalRendezVous = this.countEventsByTypeAndMonth("Rendez-vous");

        const monthlyEventsChart = {
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

        const employeeEventCount = this.countEventsByEmployeeAndMonth();
        const employeeEventChart = {
            labels: Object.keys(employeeEventCount),
            datasets: [
                {
                    label: "Nombre d'évènements par employés",
                    data: Object.values(employeeEventCount),
                    backgroundColor: "rgba(187, 12, 12, 0.6)",
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
                            Total d'évènements en {this.getCurrentMonthName()}
                        </h3>
                        <p className={styles.labelStats}>
                            Nombre d'interventions : {totalInterventions}
                        </p>
                        <p className={styles.labelStats}>
                            Nombre de rendez-vous : {totalRendezVous}
                        </p>
                        <div className={styles.eventChart}>
                            <Pie data={monthlyEventsChart} />
                        </div>
                    </div>
                    <div className={styles.eventCard}>
                        <h3>
                            Répartition par employé en{" "}
                            {this.getCurrentMonthName()}
                        </h3>
                        <div className={styles.employeeChart}>
                            <Bar data={employeeEventChart} />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default StatisticsPageWrapper;
