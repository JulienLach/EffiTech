import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import SidebarMenu from '../../components/SidebarMenu/SidebarMenu';
import styles from './DashboardPage.module.css';
import { getAllEvents } from '../../services/api';

const DashboardPage = function() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(function() {
    getAllEvents(function(error, data) {
      if (error) {
        setError(err.message);
      } else {
        try {
          const parsedData = JSON.parse(data);
          setEvents(parsedData);
        } catch (parseError) {
          setError('Erreur lors de la conversion des données JSON');
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
        <div>
          <h1>Page d'accueil</h1>
          <p>test paragraphe</p>
          <div>
          <h2>Événements</h2>
          <table>
            <thead>
              <tr>
                <th>Titre</th>
                <th>Description</th>
                <th>Status</th>
                <th>Date de début</th>
              </tr>
            </thead>
            <tbody>
              {events.map(function(event) {
                return (
                  <tr key={event.idEvent}>
                    <td>{event.title}</td>
                    <td>{event.description}</td>
                    <td>{event.status}</td>
                    <td>{event.startingDate}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;