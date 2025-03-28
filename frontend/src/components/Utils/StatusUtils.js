import React from "react";

function getStatusIndicator(status) {
    const style = {
        padding: "2px 10px",
        borderRadius: "8px",
        color: "white",
        fontSize: "0.9em",
        fontWeight: "500",
    };

    switch (status) {
        case 1:
            return (
                <span
                    style={{
                        ...style,
                        backgroundColor: "#EBEBEB",
                        color: "#505050",
                    }}
                >
                    À planifier
                </span>
            );
        case 2:
            return (
                <span
                    style={{
                        ...style,
                        backgroundColor: "#FFDEDE",
                        color: "#923838",
                    }}
                >
                    En retard
                </span>
            );
        case 3:
            return (
                <span
                    style={{
                        ...style,
                        backgroundColor: "#D3F4FF",
                        color: "#2C5BA1",
                    }}
                >
                    Aujourd'hui
                </span>
            );
        case 4:
            return (
                <span
                    style={{
                        ...style,
                        backgroundColor: "#FFECCF",
                        color: "#C35E00",
                    }}
                >
                    À venir
                </span>
            );
        case 5:
            return (
                <span
                    style={{
                        ...style,
                        backgroundColor: "#DCFFD6",
                        color: "#48903C",
                    }}
                >
                    Terminé
                </span>
            );
        default:
            return null;
    }
}

export default getStatusIndicator;
