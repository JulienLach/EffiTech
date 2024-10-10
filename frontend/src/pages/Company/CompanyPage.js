import React, { Component } from "react";
import TemplateGlobal from "../Template/TemplateGlobal";
import styles from "./CompanyPage.module.css";

class CompanyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: {},
        };
    }

    render() {
        return (
            <div>
                <TemplateGlobal />
            </div>
        );
    }
}

export default CompanyPage;
