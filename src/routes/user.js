const express = require('express');
const { requireSignin } = require('../common-middleware');
const { signup, signin, profile } = require('../controller/user');
const { isRequestValidated, validateSigninRequest, validateSignupRequest } = require('../validators/user');
const router = express.Router();

router.post('/signup', validateSignupRequest, isRequestValidated, signup);
router.post('/signin', validateSigninRequest, isRequestValidated, signin);
// router.post('/profile', requireSignin, profile);

module.exports = router;