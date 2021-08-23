const express = require('express');
const { requireSignin, userMiddleware } = require('../common-middleware');
const router = express.Router();
const { addItemsToCart, getCartItems, removeCartItems } = require('../controller/cart');

router.post('/cart/addtocart', requireSignin, userMiddleware, addItemsToCart);
router.post('/getCartItems', requireSignin, userMiddleware, getCartItems);
router.post(
    "/cart/removeItem",
    requireSignin,
    userMiddleware,
    removeCartItems
);

module.exports = router;