import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import "./styles/GlobalStyles.module.css";
import LoginPage from "./pages/Login/LoginPage";
import CreateAccountPage from "./pages/CreateAccount/CreateAccountPage";
import CalendarPage from "./pages/Calendar/CalendarPage";
import InterventionFormPage from "./pages/InterventionForm/InterventionFormPage";
import ReportPage from "./pages/Report/ReportPage";
import EmployeesPage from "./pages/Employees/EmployeesPage";
import EmployeeDetailsPage from "./pages/EmployeeDetails/EmployeeDetailsPage";
import AppointmentFormPage from "./pages/AppointmentForm/AppointmentFormPage";
import EmployeeFormPage from "./pages/EmployeeForm/EmployeeFormPage";
import ClientsPage from "./pages/Clients/ClientsPage";
import ClientDetailsPage from "./pages/ClientDetails/ClientDetailsPage";
import ClientFormPage from "./pages/ClientForm/ClientFormPage";
import CompanyFormPage from "./pages/CompanyForm/CompanyFormPage";
import CompanyPage from "./pages/Company/CompanyPage";
import CompanyDetails from "./pages/CompanyDetails/CompanyDetails";
import ExpensePage from "./pages/Expense/ExpenseFormPage";
import DocumentsPage from "./pages/Documents/DocumentsPage";
import DocumentDetailsPage from "./pages/Documents/DocumentDetailsPage";
import NotificationsPage from "./pages/Notifications/NotificationsPage";
import CalendarMobilePage from "./pages/CalendarMobile/CalendarMobilePage";
import InvoicesPage from "./pages/Invoices/InvoicesPage";
import StatisticsPage from "./pages/Statistics/StatisticsPage";
import ParametersPage from "./pages/Parameters/ParametersPage";

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
                <Route path="/employee-form" element={<EmployeeFormPage />} />
                <Route path="/clients" element={<ClientsPage />} />
                <Route path="/client-details" element={<ClientDetailsPage />} />
                <Route path="/client-form" element={<ClientFormPage />} />
                <Route path="/company" element={<CompanyPage />} />
                <Route path="/company-form" element={<CompanyFormPage />} />
                <Route path="/company-details" element={<CompanyDetails />} />
                <Route path="/expense" element={<ExpensePage />} />
                <Route path="/documents" element={<DocumentsPage />} />
                <Route
                    path="/document-details"
                    element={<DocumentDetailsPage />}
                />
                <Route path="/notifications" element={<NotificationsPage />} />
                <Route
                    path="/calendar-mobile"
                    element={<CalendarMobilePage />}
                />
                <Route path="/invoices" element={<InvoicesPage />} />
                <Route path="/statistics" element={<StatisticsPage />} />
                <Route path="/parameters" element={<ParametersPage />} />
            </Routes>
        </Router>
    );
};

export default App;
