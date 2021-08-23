const jwt = require('jsonwebtoken')

const multer = require('multer');
const shortid = require('shortid');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname)
    }
});
exports.upload = multer({ storage: storage });

exports.requireSignin = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        try {
            const user = jwt.verify(token, process.env.JWT_SECRET);
            req.user = user;
            next();
        }
        catch (error) {
            return res.status(500).json({
                message: 'Invalid Token'
            })
        }

    }
    else {
        return res.status(400).json({
            message: 'Authorization required'
        })
    }

}

// middleware to identify that the user is admin
exports.adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(400).json({
            message: 'Access Denied: Only Admin can access this..!'
        })
    }
    next();
}

// middleware to identify that the user is normal user
exports.userMiddleware = (req, res, next) => {
    if (req.user.role !== 'user') {
        return res.status(400).json({
            message: 'Access Denied: Only customers can access this...!'
        })
    }
    next();
}