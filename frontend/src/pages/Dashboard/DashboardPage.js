import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import SidebarMenu from '../../components/SidebarMenu/SidebarMenu';
import styles from './DashboardPage.module.css';
import { getAllEvents } from '../../services/api';

const DashboardPage = function() {
  const [events, setEvents] = useState([]);

  useEffect(function() {
    getAllEvents()
      .then(setEvents)
      .catch(function(error) {
        console.error('Erreur lors de la récupération des événements', error);
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
            <ul>
              {events.map(function(event) {
                return (
                  <li key={event.idEvent}>
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                    <p>Status: {event.status}</p>
                    <p>Date de début: {event.startingDate}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;