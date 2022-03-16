const router = require("../routes/orderRoutes");
const Order = require("../models/Order");

// [Desc]       Create order
// [Route]      POST /orders
// [Access]     User
const createOrder = async (data) => {
	const newOrder = new Order(data.reqBody);

	return newOrder.save().then((order, err) => {
		if (err) return err;
		return order;
	});
};

// [Desc]       Get user orders
// [Route]      GET /order/:userId
// [Access]     User
const userOrders = async (data) => {
	if (data.userId !== data.payload.id) return false;

	const orders = Order.find({ userId: data.userId });

	return orders;
};

module.exports = { createOrder, userOrders };
