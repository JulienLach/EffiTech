import React, { Component } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Composant fonctionnel wrapper
const TestPageWrapper = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return <TestPage navigate={navigate} location={location} />;
};

class TestPage extends Component {
    render() {
        const isMobile = window.navigator.userAgentData;

        return <>{isMobile.mobile ? <h2>Mobile</h2> : <h2>Desktop</h2>}</>;
    }
}

export default TestPageWrapper;
