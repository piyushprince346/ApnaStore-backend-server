const express = require('express');
const { requireSignin, adminMiddleware } = require('../common-middleware');
const router = express.Router();
const { createCategory, getCategories, updateCategories, deleteCategories } = require('../controller/category');

// handling uploaded files
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
const upload = multer({ storage: storage });

router.post('/create', requireSignin, adminMiddleware, upload.single('categoryImage'), createCategory);
router.get('/getCategories', getCategories);
router.post('/update', upload.array('categoryImage'), updateCategories);
router.post('/delete', deleteCategories);


module.exports = router;