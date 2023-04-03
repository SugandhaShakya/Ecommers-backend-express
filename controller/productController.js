const { Product } = require("../models/productModel");
const { Category } = require("../models/categoryModel");
const mongoose = require("mongoose");

// @desc    Get products
// @route   Get /api.v1/products
// @access  public
const getProducts = async (req, res) => {
    let filter = {};
    if (req.query.categories) {
        filter = { category: req.query.categories.split(",") };
    }

    const productList = await Product.find(filter).populate("category");

    if (!productList) {
        res.status(500).json({ success: false });
    }
    res.send(productList);
};

const getProduct = async (req, res) => {
    const product = await Product.findById(req.params.id).populate("category"); //add category detail referencing from another collection
    if (!product) {
        res.status(500).json({ sucess: false });
    }
    res.send(product);
};

const getCount = async (req, res) => {
    try {
        const productCount = await Product.countDocuments();
        res.send({ productCount });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
};

const getFeatured = async (req, res) => {
    const products = await Product.find({ isFeatured: true });

    if (!products) {
        res.status(500).json({ sucess: false });
    }
    res.send(products);
};

const getFeaturedCount = async (req, res) => {
    const count = req.params.count;
    const products = await Product.find({ isFeatured: true }).limit(+count);

    if (!products) {
        res.status(500).json({ sucess: false });
    }
    res.send(products);
};

// @desc    Add product
// @route   Post /api.v1/products
// @access  Private
const setProducts = async (req, res) => {
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send("Invalid Category");

    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richdescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
    });
    product = await product.save();

    if (!product) return res.status(500).send("the product cannot be created");

    res.send(product);
};

const updateProduct = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).send("Product Id is required");
        }
        // if(!mongoose.isValidObjectId(req.params.id)){
        //   res.status(400).send('Invalid Product Id')
        // }
        const category = await Category.findById(req.body.category);
        if (!category) return res.status(400).send("Invalid Category");

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                description: req.body.description,
                richDescription: req.body.richdescription,
                image: req.body.image,
                brand: req.body.brand,
                price: req.body.price,
                category: req.body.category,
                countInStock: req.body.countInStock,
                rating: req.body.rating,
                numReviews: req.body.numReviews,
                isFeatured: req.body.isFeatured,
            },
            { new: true }
        );
        if (!product) {
            return res.status(400).send(" the product cannot be updated ");
        }
        res.send(product);
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ sucess: false, message: "internal server error" });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.deleteOne({ _id: req.params.id });
        if (product.deletedCount === 0) {
            return res
                .status(404)
                .json({ success: false, message: "Product not found" });
        }
        return res
            .status(200)
            .json({ success: true, message: "Product deleted successfully" });
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = {
    getProducts,
    getCount,
    setProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    getFeatured,
    getFeaturedCount,
};
