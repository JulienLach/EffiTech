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
                        <h3>Matériel :</h3>
                        <input type="text" />
                    </div>
                    <div className={stylesMobile.inputDisplay}>
                        <h3>Prix TTC :</h3>
                        <input type="number" />
                    </div>
                    <div className={stylesMobile.inputDisplay}>
                        <h3>Justificatif :</h3>
                        <input
                            className={stylesMobile.download}
                            type="file"
                        ></input>
                    </div>
                    <div className={stylesMobile.inputDisplay}>
                        <h3>Numéro d'intervention :</h3>
                        <input type="text" />
                    </div>
                    <div className={stylesMobile.textArea}>
                        <h3>Commentaire :</h3>
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
