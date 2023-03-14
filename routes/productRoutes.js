const express = require("express");
const { getProducts, setProducts, getProduct, updateProduct, deleteProduct, getCount, getFeatured, getFeaturedCount  } = require("../controller/productController");
const router = express.Router();

router.get("/", getProducts);
router.get("/", getProducts);
router.post("/", setProducts);
router.put("/:id", updateProduct)
router.delete("/:id", deleteProduct)

router.get("/:id", getProduct);
router.get('/get/count', getCount)
router.get('/get/featured', getFeatured)
router.get('/get/featured/:count', getFeaturedCount)


module.exports = router;
