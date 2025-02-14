const generateSimplePDF = (title) => {
    return new Promise((resolve, reject) => {
        // Créer un élément canvas
        const canvas = document.createElement("canvas");
        canvas.width = 600;
        canvas.height = 400;
        const ctx = canvas.getContext("2d");

        // Dessiner le titre sur le canvas
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.fillText(title, canvas.width / 2, canvas.height / 2);

        // Convertir le canvas en Blob
        canvas.toBlob((blob) => {
            if (blob) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    resolve(reader.result);
                };
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            } else {
                reject(new Error("Erreur lors de la génération du PDF"));
            }
        }, "application/pdf");
    });
};

export default generateSimplePDF;
