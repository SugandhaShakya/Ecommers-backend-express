const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
    // console.log(res.headers)
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // get token form header
            token = req.headers.authorization.split(" ")[1];

            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // console.log(decoded)

            // get user from the token
            req.user = await User.findById(decoded.userId).select(
                "-passwordHash"
            );

            next();
        } catch (error) {
            console.log(error);
            res.status(401).json({ message: "Not authorized " });
        }
    }
    if (!token) {
        res.status(401).json({ message: "Not authorized, no token" });
    }
});
module.exports = { protect };
