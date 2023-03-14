const express = require("express");
const { getCategory, setCategory, getCategoryById, deleteCategory, updateCategory } = require("../controller/CategoryController");
const router = express.Router();

router.get("/", getCategory);
router.get('/:id', getCategoryById )
router.post("/", setCategory);
router.delete('/:id', deleteCategory)
router.put('/:id', updateCategory)

module.exports = router;
