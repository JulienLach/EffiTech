import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import CreateAccountPage from './pages/CreateAccount/CreateAccountPage';
import CalendarPage from './pages/Calendar/CalendarPage';
import InterventionForm from './components/InterventionForm/InterventionForm';
import InterventionFormPage from './pages/InterventionForm/InterventionFormPage';
import ReportPage from './pages/Report/ReportPage';
import TeamPage from './pages/Team/TeamPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/intervention-form" element={<InterventionFormPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/team" element={<TeamPage />} />
      </Routes>
    </Router>
  );
};

export default App;