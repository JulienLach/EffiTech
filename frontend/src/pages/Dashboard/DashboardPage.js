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
        setError(err.message);
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
                <tr>
                  <td>
                    <a href="#">Jean Bombeur</a>
                  </td>
                  <td>INT00001</td>
                  <td>Intervention</td>
                  <td><a href="#">Réparation chaudière</a></td>
                  <td>À venir</td>
                  <td>18/07/2024</td>
                  <td>
                    <a href="#">William Leplombier</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="#">Sandra Pô</a>
                  </td>
                  <td>INT000002</td>
                  <td>Rendez-vous</td>
                  <td><a href="#">Radiateur en panne</a></td>
                  <td>A venir</td>
                  <td>14/10/2024</td>
                  <td>
                    <a href="#">Jacques Padefuite</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="#">Sandra Pô</a>
                  </td>
                  <td>INT000002</td>
                  <td>Rendez-vous</td>
                  <td><a href="#">Radiateur en panne</a></td>
                  <td>A venir</td>
                  <td>14/10/2024</td>
                  <td>
                    <a href="#">Jacques Padefuite</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="#">Sandra Pô</a>
                  </td>
                  <td>INT000002</td>
                  <td>Rendez-vous</td>
                  <td><a href="#">Radiateur en panne</a></td>
                  <td>A venir</td>
                  <td>14/10/2024</td>
                  <td>
                    <a href="#">Jacques Padefuite</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="#">Sandra Pô</a>
                  </td>
                  <td>INT000002</td>
                  <td>Rendez-vous</td>
                  <td><a href="#">Radiateur en panne</a></td>
                  <td>A venir</td>
                  <td>14/10/2024</td>
                  <td>
                    <a href="#">Jacques Padefuite</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="#">Sandra Pô</a>
                  </td>
                  <td>INT000002</td>
                  <td>Rendez-vous</td>
                  <td><a href="#">Radiateur en panne</a></td>
                  <td>A venir</td>
                  <td>14/10/2024</td>
                  <td>
                    <a href="#">Jacques Padefuite</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="#">Sandra Pô</a>
                  </td>
                  <td>INT000002</td>
                  <td>Rendez-vous</td>
                  <td><a href="#">Radiateur en panne</a></td>
                  <td>A venir</td>
                  <td>14/10/2024</td>
                  <td>
                    <a href="#">Jacques Padefuite</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="#">Sandra Pô</a>
                  </td>
                  <td>INT000002</td>
                  <td>Rendez-vous</td>
                  <td><a href="#">Radiateur en panne</a></td>
                  <td>A venir</td>
                  <td>14/10/2024</td>
                  <td>
                    <a href="#">Jacques Padefuite</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="#">Sandra Pô</a>
                  </td>
                  <td>INT000002</td>
                  <td>Rendez-vous</td>
                  <td><a href="#">Radiateur en panne</a></td>
                  <td>A venir</td>
                  <td>14/10/2024</td>
                  <td>
                    <a href="#">Jacques Padefuite</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="#">Sandra Pô</a>
                  </td>
                  <td>INT000002</td>
                  <td>Rendez-vous</td>
                  <td><a href="#">Radiateur en panne</a></td>
                  <td>A venir</td>
                  <td>14/10/2024</td>
                  <td>
                    <a href="#">Jacques Padefuite</a>
                  </td>
                </tr>
                                <tr>
                  <td>
                    <a href="#">Sandra Pô</a>
                  </td>
                  <td>INT000002</td>
                  <td>Rendez-vous</td>
                  <td><a href="#">Radiateur en panne</a></td>
                  <td>A venir</td>
                  <td>14/10/2024</td>
                  <td>
                    <a href="#">Jacques Padefuite</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
