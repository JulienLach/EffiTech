const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification.controller.js');

router.get('/notifications', notificationController.getAllNotifications);