const express = require("express");
const router = express.Router();

const { getUser, registerUser, getUserById, loginUser, updateUser, userCount, deleteUser } = require("../controller/userController");
const {protect} = require('../middleware/authMiddleware');
const isAdmin = require("../middleware/isAdmin");


router.get("/", protect, isAdmin, getUser);
router.post("/", registerUser);
router.put("/:id", protect, isAdmin, updateUser);
router.delete("/:id", protect, isAdmin, deleteUser);


router.post("/login", loginUser);
router.get('/:id', protect, isAdmin, getUserById )
router.get('/get/count', userCount);



module.exports = router;