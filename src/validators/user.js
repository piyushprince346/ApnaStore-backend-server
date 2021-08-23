const { check, validationResult } = require('express-validator');
exports.validateSignupRequest = [
    check("firstName", "firstName is required")
        .not()
        .isEmpty(),
    check("lastName", "lastName is required")
        .not()
        .isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password must be atleast 6 character long..!").isLength({
        min: 6
    })
];

exports.validateSigninRequest = [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password must be atleast 6 character long..!").isLength({
        min: 6
    })
];

exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('Error: ', errors);
        return res.status(400).json({
            errors: errors.array()[0].msg
        });
    }
    next();
}