import React, { Component } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import stylesMobile from "./ExpenseFormPage.module.css";
import TemplateGlobalMobile from "../Template/TemplateGlobalMobile";

function ExpenseFormPageWrapper() {
    const navigate = useNavigate();
    const location = useLocation();
    return <ExpenseFormPage navigate={navigate} location={location} />;
}

class ExpenseFormPage extends Component {
    render() {
        return (
            <>
                <TemplateGlobalMobile />
                <div className={stylesMobile.container}>
                    <div className={stylesMobile.inputDisplay}>
                        <label>Matériel :</label>
                        <input type="text" />
                    </div>
                    <div className={stylesMobile.inputDisplay}>
                        <label>Prix TTC :</label>
                        <input type="number" />
                    </div>
                    <div className={stylesMobile.inputDisplay}>
                        <label>Justificatif :</label>
                        <input
                            className={stylesMobile.download}
                            type="file"
                        ></input>
                    </div>
                    <div className={stylesMobile.inputDisplay}>
                        <label>Numéro d'intervention :</label>
                        <input type="text" />
                    </div>
                    <div className={stylesMobile.textArea}>
                        <label>Commentaire :</label>
                        <textarea rows="5" name="breakdown"></textarea>
                    </div>
                    <div className={stylesMobile.modalFooter}>
                        <button
                            className={stylesMobile.cancelButton}
                            type="reset"
                            onClick={() =>
                                (window.location.href = "/calendar#")
                            }
                        >
                            <i className="fas fa-times"></i>
                            Annuler
                        </button>
                        <button
                            className={stylesMobile.validateButton}
                            type="submit"
                        >
                            <i className="fas fa-check"></i>
                            Enregistrer
                        </button>
                    </div>
                </div>
            </>
        );
    }
}

export default ExpenseFormPageWrapper;
