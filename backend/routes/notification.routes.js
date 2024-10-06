const express = require("express");
const router = express.Router();
const notificationServices = require("../services/notification.services.js");

router.get("/", notificationServices.getAllNotifications);
