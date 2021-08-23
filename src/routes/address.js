const express = require('express');
const { requireSignin, userMiddleware } = require('../common-middleware');
const { addAddress, getAddress } = require('../controller/address');
const router = express.Router();


router.post('/address/create', requireSignin, userMiddleware, addAddress);
router.post('/getaddress', requireSignin, userMiddleware, getAddress);

module.exports = router;