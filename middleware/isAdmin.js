const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const isAdmin = asyncHandler(async (req, res, next) => {
    if (req.user && req.user._id) {
        let user = await User.findById(req.user._id);
        if (user && user.isAdmin) {
            next();
        } else {
            res.status(401).json({
                sucess: false,
                message: "Not authorized as an admin",
            });
        }
    } else {
        res.status(401).json({ message: "Not authorized" });
    }
});

module.exports = isAdmin;
