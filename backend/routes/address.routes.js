const express = require("express");
const router = express.Router();
const addressServices = require("../services/address.services.js");

router.get("/:idAddress", addressServices.getAddressById);

router.post("/", addressServices.createAddress);

module.exports = router;
