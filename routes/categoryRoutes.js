const express = require("express");
const { getCategory, setCategory, getCategoryById, deleteCategory, updateCategory } = require("../controller/CategoryController");
const { protect } = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");
const router = express.Router();

router.get("/", getCategory);
router.get('/:id', getCategoryById )
router.post("/",  protect, isAdmin, setCategory);
router.delete('/:id',protect, isAdmin, deleteCategory)
router.put('/:id', protect, isAdmin, updateCategory)

module.exports = router;
