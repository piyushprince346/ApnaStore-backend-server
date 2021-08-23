const express = require('express');
const { requireSignin, adminMiddleware } = require('../common-middleware');
const { signup, signin, profile, signout } = require('../controller/admin');
const { isRequestValidated, validateSignupRequest, validateSigninRequest } = require('../validators/user');
const router = express.Router();

router.post('/signup', validateSignupRequest, isRequestValidated, signup);
router.post('/signin', validateSigninRequest, isRequestValidated, signin);
router.post('/signout', requireSignin, adminMiddleware, signout);
// router.post('/profile', requireSignin, profile);
module.exports = router;