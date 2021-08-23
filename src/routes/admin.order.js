const express = require("express");
const { requireSignin, adminMiddleware } = require("../common-middleware");
const {
    updateOrder,
    getCustomerOrders,
} = require('../controller/order.admin');
const router = express.Router();

router.post(`/update`, requireSignin, adminMiddleware, updateOrder);
router.post(
    `/getCustomerOrders`,
    requireSignin,
    adminMiddleware,
    getCustomerOrders
);

module.exports = router;