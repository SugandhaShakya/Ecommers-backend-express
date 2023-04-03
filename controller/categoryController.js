// const asyncHandler = require("express-async-handler");

const { Category } = require("../models/categoryModel");

// @desc    Get products
// @route   Get /api.v1/products
// @access  public
const getCategory = async (req, res) => {
    const categoryList = await Category.find();
    if (!categoryList) {
        res.status(500).json({ sucess: false });
    }
    res.status(200).send(categoryList);
};

const getCategoryById = async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
        res.status(500).json({
            message: "The category with the given ID was not found.",
        });
    }
    res.status(200).send(category);
};

// @desc    Add product
// @route   Post /api.v1/products
// @access  Private
const setCategory = async (req, res) => {
    console.log(req.body);
    console.log(Category);
    try {
        let category = new Category({
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color,
        });
        category = await category.save();
        if (!category)
            return res.status(404).send("the category cannot be created!");

        res.send(category);
    } catch (err) {
        console.error("err");
        res.status(500).send("Internal Server Error");
    }
};

// const deleteCategory = async (req, res) => {
//   try {
//     const category = await Category.findById(req.params.id);
//     if (!category) {
//       return res
//         .status(404)
//         .json({ sucess: false, message: "the category not found" });
//     }
//     await category.remove();
//     return res
//       .status(200)
//       .json({ sucess: true, message: "the category is deleted" });
//   } catch (err) {
//     console.error(err);
//     return res
//       .status(500)
//       .json({ sucess: false, message: "Internal Server Error" });
//   }
// };

const deleteCategory = async (req, res) => {
    try {
        const category = await Category.deleteOne({ _id: req.params.id });
        if (category.deletedCount === 0) {
            return res
                .status(404)
                .json({ success: false, message: "Category not found" });
        }
        return res
            .status(200)
            .json({ success: true, message: "Category deleted successfully" });
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
};

const updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                icon: req.body.icon,
                color: req.body.color,
            },
            { new: true }
        );
        if (!category) {
            return res.status(400).send(" the category cannot be updated ");
        }
        res.send(category);
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ sucess: false, message: "internal server error" });
    }
};

module.exports = {
    getCategory,
    getCategoryById,
    setCategory,
    deleteCategory,
    updateCategory,
};
