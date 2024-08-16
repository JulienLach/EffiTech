import React from 'react';
import Header from '../../components/Header/Header';
import SidebarMenu from '../.././components/SidebarMenu/SidebarMenu';
import styles from './DashboardPage.module.css';

const DashboardPage = () => {
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <SidebarMenu />
        </aside>
        <div className={styles.mainContent}>
          <h1>Page d'accueil</h1>
          <p>test paragraphe</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;