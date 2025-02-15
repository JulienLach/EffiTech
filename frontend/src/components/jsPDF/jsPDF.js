import { jsPDF } from "jspdf";

const generatePDF = (title) => {
    try {
        const doc = new jsPDF();
        doc.setFontSize(30);
        doc.text(title, 105, 50, { align: "center" });

        const pdfDataUri = doc.output("datauristring");
        return pdfDataUri;
    } catch (error) {
        throw new Error("Erreur lors de la génération du PDF");
    }
};

export default generatePDF;
