import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import CreateAccountPage from "./pages/CreateAccount/CreateAccountPage";
import CalendarPage from "./pages/Calendar/CalendarPage";
import InterventionFormPage from "./pages/InterventionForm/InterventionFormPage";
import ReportPage from "./pages/Report/ReportPage";
import EmployeesPage from "./pages/Employees/EmployeesPage";
import EmployeeDetailsPage from "./pages/EmployeeDetails/EmployeeDetailsPage";
import AppointmentFormPage from "./pages/AppointmentForm/AppointmentFormPage";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/create-account" element={<CreateAccountPage />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route
                    path="/intervention-form"
                    element={<InterventionFormPage />}
                />
                <Route path="/report" element={<ReportPage />} />
                <Route path="/employees" element={<EmployeesPage />} />
                <Route
                    path="/employee-details"
                    element={<EmployeeDetailsPage />}
                />
                <Route
                    path="/appointment-form"
                    element={<AppointmentFormPage />}
                />
            </Routes>
        </Router>
    );
};

export default App;