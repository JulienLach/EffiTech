import React, { useEffect, useState } from "react";
import TemplateGlobal from "../Template/TemplateGlobal";
import styles from "./DashboardPage.module.css";
import GlobalStyles from "../../styles/GlobalStyles.module.css";
import { getAllEvents } from "../../services/api";
import FilterBar from "../../components/FilterBar/FilterBar";
import InterventionForm from "../../components/InterventionForm/InterventionForm";
import CreateEventForm from "../../components/CreateEventForm/CreateEventForm";

const DashboardPage = function () {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [isEventModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);

  useEffect(function () {
    getAllEvents(function (error, data) {
      if (error) {
        setError(error.message);
      } else {
        setEvents(data);
      }
    });
  }, []);

  const getStatusIndicator = (status) => {
    const style = {
      padding: "2px 10px",
      borderRadius: "8px",
      color: "white",
      fontSize: "0.8em",
      fontWeight: "500",
    };

    switch (status) {
      case 5:
        return (
          <span
            style={{ ...style, backgroundColor: "#DCFFD6", color: "#48903C" }}
          >
            Terminé
          </span>
        );
      case 4:
        return (
          <span
            style={{ ...style, backgroundColor: "#D3F4FF", color: "#2C5BA1" }}
          >
            Aujourd'hui
          </span>
        );
      case 3:
        return (
          <span
            style={{ ...style, backgroundColor: "#FFDEDE", color: "#923838" }}
          >
            En retard
          </span>
        );
      case 2:
        return (
          <span
            style={{ ...style, backgroundColor: "#FFECCF", color: "#C35E00" }}
          >
            À venir
          </span>
        );
      case 1:
        return (
          <span
            style={{ ...style, backgroundColor: "#EBEBEB", color: "#505050" }}
          >
            À planifier
          </span>
        );
    }
  };

  function toggleEventModal(event = null) {
    setSelectedEvent(event);
    setIsModalOpen(event !== null);
  }

  function toggleCreateEventModal() {
    setIsCreateEventModalOpen(!isCreateEventModalOpen);
  }

  return (
    <div>
      <TemplateGlobal />
      <div className={styles.container}>
        <div className={styles.fixedTopSide}>
          <h1 className={styles.pageTitle}>Calendrier</h1>
          <div className={styles.filterBar}>
            <FilterBar toggleCreateEventModal={toggleCreateEventModal} />
          </div>
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
              {events.map((event) => (
                <tr key={event.idEvent}>
                  <td>
                    <a href="#">
                      {event.client.firstname} {event.client.lastname}
                    </a>
                  </td>
                  <td>INT-{event.idEvent}</td>
                  <td>{event.type}</td>
                  <td>
                    <a
                      href="#"
                      onClick={function () {
                        toggleEventModal(event);
                      }}
                    >
                      {event.title}
                    </a>
                  </td>
                  <td>{getStatusIndicator(event.status)}</td>
                  <td>{new Date(event.startingDate).toLocaleDateString()}</td>
                  <td>
                    <a href="#">
                      {event.employee.firstname} {event.employee.lastname}
                    </a>
                  </td>
                </tr>
              ))}
              <tr>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
              </tr>
              <tr>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
              </tr>
              <tr>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
              </tr>
              <tr>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
              </tr>
              <tr>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
              </tr>
              <tr>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
              </tr>
              <tr>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
              </tr>
              <tr>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
              </tr>
              <tr>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
              </tr>
              <tr>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
              </tr>
              <tr>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
              </tr>
              <tr>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
              </tr>
              <tr>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
              </tr>
              <tr>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
              </tr>
              <tr>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {isEventModalOpen && (
        <InterventionForm
          event={selectedEvent}
          closeModal={function () {
            toggleEventModal();
          }}
        />
      )}
      {isCreateEventModalOpen && (
        <CreateEventForm closeModal={toggleCreateEventModal} />
      )}
    </div>
  );
};

export default DashboardPage;
