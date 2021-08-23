const express = require('express');
const { requireSignin, adminMiddleware, upload } = require('../common-middleware');
const { createPage, getPage } = require('../controller/page');
const router = express.Router();

router.post('/create', requireSignin, adminMiddleware, upload.fields([
    { name: 'banners' },
    { name: 'products' }
]), createPage)

router.get(`/:category/:type`, getPage);

module.exports = router;