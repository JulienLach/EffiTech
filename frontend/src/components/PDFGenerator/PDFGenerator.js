import React, { useState, useEffect } from "react";
import globalStyles from "../../styles/GlobalStyles.module.css";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  pdf,
} from "@react-pdf/renderer";
import logo from "../../images/logo.svg";


const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
  },
  logoText: {
    fontSize: 30,
    margin: 20,
  },
});

const PDFGenerator = () => {
  const [pdfBlob, setPdfBlob] = useState(null);

  useEffect(() => {
    const generatePdf = async () => {
      const doc = (
        <Document>
          <Page size="A4" style={styles.page}>
            <View>
            <Text style={styles.logoText}>[LOGO COMPANY]</Text>

            </View>
          </Page>
        </Document>
      );

      const asPdf = pdf([]);
      asPdf.updateContainer(doc);
      const blob = await asPdf.toBlob();
      setPdfBlob(blob);
    };

    generatePdf();
  }, []);

  return (
    <div>
      {pdfBlob && (
        <iframe
          src={URL.createObjectURL(pdfBlob)}
          width="100%"
          height="600px"
          title="PDF Document"
        />
      )}
    </div>
  );
};

export default PDFGenerator;
