import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import CreateAccountPage from './pages/CreateAccount/CreateAccountPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import InterventionForm from './components/InterventionForm/InterventionForm';
import TechInterventionFormPage from './pages/TechInterventionForm/TechInterventionFormPage';
import GeneratedInterventionPage from './pages/GeneratedIntervention/GeneratedInterventionPage';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/technician-intervention-form-page" element={<TechInterventionFormPage />} />
        <Route path="/generated-intervention-page" element={<GeneratedInterventionPage />} />
      </Routes>
    </Router>
  );
};

export default App;