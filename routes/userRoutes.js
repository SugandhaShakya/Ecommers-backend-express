const express = require("express");
const router = express.Router();

const { getUser, registerUser, getUserById, loginUser } = require("../controller/userController");
const {protect} = require('../middleware/authMiddleware');
const isAdmin = require("../middleware/isAdmin");


router.get("/", protect, isAdmin, getUser);
router.post("/", protect, isAdmin, registerUser);
router.post("/login", loginUser);
router.get('/:id', protect, isAdmin, getUserById )



module.exports = router;