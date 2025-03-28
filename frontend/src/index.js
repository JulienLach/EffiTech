import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(<App />);

// Enregistrement du Service Worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/service-worker.js")
            .then((registration) => {
                console.log(
                    "Service Worker enregistré avec succès:",
                    registration
                );
            })
            .catch((error) => {
                console.log(
                    "Erreur lors de l’enregistrement du Service Worker:",
                    error
                );
            });
    });
}
