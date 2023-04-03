const express = require("express");
const { getOrder, setOrder, getOrderById, updateOrder, deleteOrder } = require("../controller/orderController");
const {protect} = require('../middleware/authMiddleware');

const router = express.Router();

router.get("/", protect, getOrder)
router.get("/:id", protect, getOrderById)
router.post('/', protect, setOrder)
router.put("/:id", protect, updateOrder)
router.put("/:id", protect, deleteOrder)

module.exports = router;