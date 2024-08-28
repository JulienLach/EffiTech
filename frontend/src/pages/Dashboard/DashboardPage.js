import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import SidebarMenu from "../../components/SidebarMenu/SidebarMenu";
import styles from "./DashboardPage.module.css";
import GlobalStyles from "../../styles/GlobalStyles.module.css";
import { getAllEvents } from "../../services/api";
import FilterBar from "../../components/FilterBar/FilterBar";

const DashboardPage = function () {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(function () {
    getAllEvents(function (error, data) {
      if (error) {
        setError(error.message);
      } else {
        try {
          const parsedData = JSON.parse(data);
          setEvents(parsedData);
        } catch (parseError) {
          setError("Erreur lors de la conversion des données JSON");
        }
      }
    });
  }, []);

  return (
    <div>
      <Header />

      <div className={styles.container}>
        <div className={styles.sidebar}>
          <SidebarMenu />
        </div>
        <div className={styles.calendarContainer}>
          <div className={styles.stickyFilter}>
            <FilterBar />
            <h3>Événements</h3>
          </div>
          <div>
            <table>
              <thead className={styles.stickyThead}>
                <tr>
                  <th>Client</th>
                  <th>Référence</th>
                  <th>Type</th>
                  <th>Titre</th>
                  <th>Statut</th>
                  <th>Date</th>
                  <th>Intervenant</th>
                </tr>
              </thead>
              <tbody>
                {events.map(event => (
                  <tr key={event.idEvent}>
                    <td>
                      <a href="#">
                        {event.idClient.firstname} {event.idClient.lastname}
                      </a>
                    </td>
                    <td>INT-{event.idEvent}</td>
                    <td>{event.type}</td>
                    <td><a href="#">{event.title}</a></td>
                    <td>{event.status}</td>
                    <td>{new Date(event.startingDate).toLocaleDateString()}</td>
                    <td>
                      <a href="#">
                        {event.idEmployee.firstname} {event.idEmployee.lastname}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;