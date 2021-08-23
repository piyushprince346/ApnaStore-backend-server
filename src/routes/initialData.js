const express = require('express');
const { initialData } = require('../controller/initialData');
const { requireSignin, adminMiddleware } = require('../common-middleware');
const router = express.Router();

router.get('/initialData', requireSignin, adminMiddleware, initialData);

module.exports = router;