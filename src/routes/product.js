const express = require('express');
const { requireSignin, adminMiddleware } = require('../common-middleware');
const { createProduct, getProductsBySlug, getProductDetailsById, deleteProductById, getProducts } = require('../controller/product');
const multer = require('multer');
const router = express.Router();
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
const upload = multer({ storage: storage })

router.post('/create', requireSignin, adminMiddleware, upload.array('productPicture'), createProduct);
router.get('/all/:slug', getProductsBySlug);
router.get("/:productId", getProductDetailsById);
router.delete(
    "/deleteProductById",
    requireSignin,
    adminMiddleware,
    deleteProductById
);
router.post(
    "/getProducts",
    requireSignin,
    adminMiddleware,
    getProducts
);


module.exports = router;