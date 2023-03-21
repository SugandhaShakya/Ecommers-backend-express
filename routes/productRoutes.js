const express = require("express");
const { getProducts, setProducts, getProduct, updateProduct, deleteProduct, getCount, getFeatured, getFeaturedCount  } = require("../controller/productController");
const router = express.Router();
const {protect} = require('../middleware/authMiddleware');
const isAdmin = require("../middleware/isAdmin");



router.get("/",protect, getProducts);
router.post("/", protect, isAdmin, setProducts);
router.put("/:id", protect, isAdmin, updateProduct)
router.delete("/:id", protect, isAdmin, deleteProduct)

router.get("/:id", getProduct);
router.get('/get/count', getCount)
router.get('/get/featured', getFeatured)
router.get('/get/featured/:count', getFeaturedCount)


module.exports = router;
