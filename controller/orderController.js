const { OrderItem } = require("../models/orderItemsModule");
const { Order } = require("../models/orderModel");

const getOrder = async (req, res) => {
    const orderList = await Order.find()
        .populate("user", "name")
        .sort({ dateOrdered: -1 });
    if (!orderList) {
        res.status(500).json({ sucess: false });
    }
    res.status(200).send(orderList);
};

const getOrderById = async (req, res) => {
    const order = await Order.findById(req.params.id)
        .populate("user", "name")
        .populate({
            path: "orderItems",
            populate: { path: "product", populate: "category" },
        });
    if (!order) {
        res.status(500).json({ sucess: false });
    }
    res.status(200).send(order);
};

const setOrder = async (req, res) => {
    try {
        //orderItem returns multiple promises insitd of therefor Promis.all is written below
        const orderItemIds = Promise.all(
            req.body.orderItems.map(async (orderItem) => {
                let newOrderItem = new OrderItem({
                    quantity: orderItem.quantity,
                    product: orderItem.product,
                });
                newOrderItem = await newOrderItem.save();
                return newOrderItem._id;
            })
        );
        const orderItemsIdsResolved = await orderItemIds; // converting promis into order item ids
        // console.log(orderItemsIdsResolved);
        let order = new Order({
            orderItems: orderItemsIdsResolved,
            shippingAddress1: req.body.shippingAddress1,
            shippingAddress2: req.body.shippingAddress2,
            city: req.body.city,
            country: req.body.country,
            phone: req.body.phone,
            status: req.body.status,
            totalPrice: req.body.totalPrice,
            user: req.body.user,
        });

        order = await order.save();
        if (!order) return res.status(404).send("the order unsucessful !!!");

        res.send(order);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

const updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            {
                status: req.body.status
            },
            { new: true }
        );
        if (!order) {
            return res.status(400).send(" the order cannot be updated ");
        }
        res.send(order);
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ sucess: false, message: "internal server error" });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const order = await Order.deleteOne({ _id: req.params.id });
        if (order.deletedCount === 0) {
            return res
                .status(404)
                .json({ success: false, message: "Order not found" });
        }
        return res
            .status(200)
            .json({ success: true, message: "Order deleted successfully" });
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = {
    getOrder,
    setOrder,
    getOrderById,
    updateOrder,
    deleteOrder,
};
