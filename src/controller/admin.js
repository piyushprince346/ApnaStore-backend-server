const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const shortid = require('shortid');

exports.signup = (req, res) => {
    console.log('An admin with following info filled the sign-up form: ', req.body);
    const {
        firstName,
        lastName,
        email,
        password
    } = req.body;
    try {
        User.findOne({
            email: email
        })
            .exec(async (error, user) => {
                if (user) {
                    return res.status(400).json({
                        message: 'Admin already registered...!'
                    })
                }
                const hash_password = await bcrypt.hash(password, 10);
                const _user = new User({
                    firstName,
                    lastName,
                    email,
                    hash_password,
                    username: shortid.generate(),
                    role: 'admin'
                });
                _user.save((error, data) => {
                    if (error) {
                        return res.status(400).json({
                            message: "Error in saving"
                        })
                    }
                    if (data) {
                        return res.status(201).json({
                            message: 'Admin created successfully'
                        })
                    }
                });
            })

    } catch (err) {
        console.log(err.message);
        return res.status(500).send("Error in Saving");
    }
}

exports.signin = (req, res) => {
    console.log('An admin with the following info has filled the signin form', req.body);
    User.findOne({
        email: req.body.email
    })
        .exec(async (error, user) => {
            if (error) {
                // some error occured while fetching the data from database
                return res.status(400).json({
                    error
                })
            }
            if (user) {
                const isPassword = await user.authenticate(req.body.password);
                // an admin with the given email found in the database
                if (isPassword && user.role === 'admin') {
                    // Logged in successfully
                    console.log('Login Successfull...!');
                    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    const { _id, firstName, lastName, email, fullName, role } = user;
                    res.cookie('token', token, { expiresIn: '1h' });
                    return res.status(200).json({
                        token,
                        user: {
                            _id,
                            firstName,
                            lastName,
                            email,
                            fullName,
                            role
                        }
                    })
                }
                else {
                    // invalid password
                    console.log('Invalid password');
                    return res.status(400).json({
                        message: 'Invalid password'
                    })
                }
            }
            else {
                // no user exist with the provided email
                console.log('Invalid email');
                return res.status(400).json({
                    message: 'Invalid email'
                })
            }
        })
};

exports.signout = (req, res) => {
    res.clearCookie('token');
    return res.status(200).json({
        message: 'Signout Successfully...!'
    })
}

exports.profile = (req, res) => {
    console.log(req.user._id);
    User.findById(req.user._id, (error, user) => {
        const { fullName, email } = user;
        return res.status(200).json({
            fullName,
            email
        })
    })
}
