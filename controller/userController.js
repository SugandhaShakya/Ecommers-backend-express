const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUser = async (req, res) => {
    const user = await User.find().select("-passwordHash");
    if (!user) {
        res.status(500).json({ sucess: false });
    }
    res.status(200).send(user);
};

const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id).select("-passwordHash");

    if (!user) {
        res.status(500).json({
            message: "The User with the given ID was not found.",
        });
    }
    res.status(200).send(user);
};

const registerUser = async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    });

    user = await user.save();

    if (!user) return res.status(400).send("ther user cannot be created!!");

    res.send(user);
};

const loginUser = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(400).send("the user not found");
    }
    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign(
            {
                userId: user.id,
                isAdmin: user.isAdmin,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "30d",
            }
        );
        res.status(200).send({ user: user.email, token });
    } else {
        res.status(400).send("password is wrong");
    }
};
const updateUser = async (req, res) => {
    try {
        const userExist = await User.findById(req.params.id);
        let newPassword = userExist.passwordHash;

        const updates = {};
        if (req.body.name) updates.name = req.body.name;
        if (req.body.email) updates.email = req.body.email;
        if (req.body.password) {
            newPassword = bcrypt.hashSync(req.body.password, 10);
            updates.passwordHash = newPassword;
        }
        if (req.body.phone) updates.phone = req.body.phone;
        if (req.body.isAdmin) updates.isAdmin = req.body.isAdmin;
        if (req.body.apartment) updates.apartment = req.body.apartment;
        if (req.body.zip) updates.zip = req.body.zip;
        if (req.body.city) updates.city = req.body.city;
        if (req.body.country) updates.country = req.body.country;

        const user = await User.findByIdAndUpdate(req.params.id, updates, {
            new: true,
        });

        if (!user) return res.status(400).send("the user cannot be created");

        res.send(user);
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ success: false, message: "internal server error" });
    }
};

const userCount = async (req, res) => {
    const userCount = await User.countDocuments();

    if (!userCount) {
        res.status(500).json({ sucess: false });
    }
    res.send({
        userCount: userCount,
    });
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.deleteOne({ _id: req.params.id });
        if (user.deletedCount === 0) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }
        return res
            .status(200)
            .json({ success: true, message: "User deleted successfully" });
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = {
    getUser,
    registerUser,
    getUserById,
    loginUser,
    updateUser,
    userCount,
    deleteUser,
};
