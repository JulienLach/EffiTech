import { jsPDF } from "jspdf";

const generatePDF = ({ report, reportData, companyData }) => {
    try {
        const doc = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
        });

        // Configuration des marges (équivalent au padding: 10)
        const margin = 10;
        let yPosition = margin;

        // Logo (converti de base64)
        if (companyData.logo) {
            doc.addImage(
                `data:image/jpeg;base64,${companyData.logo}`,
                "JPEG",
                margin,
                yPosition,
                35, // équivalent à width: 100 en pt
                35 // équivalent à height: 100 en pt
            );
        }
        yPosition += 40;

        // Informations société et client
        doc.setFontSize(12);

        // Info société (à droite)
        doc.text(companyData.name, 210 - margin, yPosition, { align: "right" });
        doc.setFont("helvetica", "bold");
        yPosition += 7;

        // Info client (à gauche)
        doc.text("Client :", margin, yPosition);
        yPosition += 7;
        doc.text(
            `Nom : ${report.client.firstname} ${report.client.lastname}`,
            margin,
            yPosition
        );
        yPosition += 7;
        doc.text(
            `Adresse : ${report.client.address.address} ${report.client.address.zipcode} ${report.client.address.city}`,
            margin,
            yPosition
        );
        yPosition += 7;
        doc.text(`Téléphone : ${report.client.phoneNumber}`, margin, yPosition);

        // Info technicien (à droite)
        doc.text("Technicien :", 210 - margin, yPosition, { align: "right" });
        yPosition += 7;
        doc.text(
            `Nom : ${report.employee.firstname} ${report.employee.lastname}`,
            210 - margin,
            yPosition,
            { align: "right" }
        );

        // Titre
        yPosition += 15;
        doc.setFontSize(15);
        doc.setFont("helvetica", "bold");
        doc.text("Rapport d'intervention", 105, yPosition, { align: "center" });

        // ID intervention
        yPosition += 10;
        doc.setFontSize(14);
        doc.setFont("helvetica", "normal");
        doc.text(`INT-${report.idEvent} - ${report.title}`, margin, yPosition);

        // Panne constatée
        yPosition += 10;
        doc.setFontSize(12);
        doc.text("Panne constatée :", margin, yPosition);
        yPosition += 7;
        doc.rect(margin, yPosition - 3, 190, 20); // Boîte autour du texte
        doc.text(report.breakdown, margin + 5, yPosition + 3, {
            maxWidth: 180,
        });

        // Réparation
        yPosition += 25;
        doc.text("Réparation :", margin, yPosition);
        yPosition += 7;
        doc.rect(margin, yPosition - 3, 190, 20);
        doc.text(report.workDone, margin + 5, yPosition + 3, { maxWidth: 180 });

        // Dates et heures
        yPosition += 25;
        doc.text(
            `Intervenu le : ${new Date(
                report.startingDate
            ).toLocaleDateString()}`,
            margin,
            yPosition
        );
        yPosition += 7;
        doc.text(
            `Heure de l’intervention : de ${report.startingHour} à ${report.endingHour}`,
            margin,
            yPosition
        );
        yPosition += 7;
        doc.text(
            `Durée de l’intervention : ${report.duration} heures`,
            margin,
            yPosition
        );

        // Signatures
        yPosition += 15;
        doc.text("Signature du client :", margin, yPosition);
        doc.text("Signature du technicien :", 210 - margin, yPosition, {
            align: "right",
        });
        yPosition += 5;
        if (reportData.clientSignature) {
            doc.addImage(
                `data:image/png;base64,${reportData.clientSignature}`,
                "PNG",
                margin,
                yPosition,
                50,
                25
            );
        }
        if (reportData.employeeSignature) {
            doc.addImage(
                `data:image/png;base64,${reportData.employeeSignature}`,
                "PNG",
                150,
                yPosition,
                50,
                25
            );
        }

        // Footer
        yPosition = 270; // Position fixe en bas de page
        doc.setFontSize(10);
        const footerText = `${companyData.name} | SIRET: ${companyData.siret} | TVA: ${companyData.vatNumber} | Capital: ${companyData.capital} € | Adresse: ${companyData.idAddress.address}, ${companyData.idAddress.city}, ${companyData.idAddress.zipcode} | Téléphone: ${companyData.phoneNumber}`;
        doc.text(footerText, 105, yPosition, {
            align: "center",
            maxWidth: 190,
        });

        // Retourne le PDF sous forme de data URI
        const pdfDataUri = doc.output("datauristring");
        return pdfDataUri;
    } catch (error) {
        throw new Error(
            "Erreur lors de la génération du PDF: " + error.message
        );
    }
};

export default generatePDF;
