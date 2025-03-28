import React from "react";

function getCategoryIndicator(category) {
    const style = {
        padding: "2px 11px",
        borderRadius: "8px",
        color: "white",
        fontSize: "0.9em",
        fontWeight: "500",
    };

    switch (category) {
        case "Professionnel":
            return (
                <span
                    style={{
                        ...style,
                        backgroundColor: "#C1F0FF",
                        color: "#2C5BA1",
                    }}
                >
                    Professionnel
                </span>
            );
        case "Particulier":
            return (
                <span
                    style={{
                        ...style,
                        backgroundColor: "#FFE4BC",
                        color: "#C35E00",
                    }}
                >
                    Particulier
                </span>
            );
        default:
            return null;
    }
}

export default getCategoryIndicator;
