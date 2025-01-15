const express = require("express");
const router = express.Router();
const documentServices = require("../services/document.services.js");

router.get("/", documentServices.getAllDocuments);

router.post("/", documentServices.importDocument);

router.get("/:idDocument", documentServices.getDocumentById);

module.exports = router;
