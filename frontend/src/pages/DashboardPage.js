import React from 'react';
import Header from '../components/Header/Header';
import SidebarMenu from '../components/SidebarMenu/SidebarMenu';

const DashboardPage = () => {
  return (
    <div>
      <Header />
      <SidebarMenu />
      <h1>Page d'accueil</h1>
      <p>test paragraphe</p>
    </div>
  );
};

export default DashboardPage;