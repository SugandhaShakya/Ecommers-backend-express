const express = require("express");
const { getOrder, setOrder, getOrderById, updateOrder, deleteOrder, getTotalSales, getOrderCount, getUserOrder } = require("../controller/orderController");
const {protect} = require('../middleware/authMiddleware');
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

router.get("/", protect, getOrder)
router.get("/:id", protect, getOrderById)
router.post('/', protect, setOrder)
router.put("/:id", protect, updateOrder)
router.delete("/:id", protect, deleteOrder)

router.get('/get/totalsales', protect, isAdmin, getTotalSales )
router.get('/get/count', protect, isAdmin, getOrderCount)
router.get('/get/userorders/:userid', protect, isAdmin, getUserOrder)

module.exports = router;