const router = require("../routes/adminRoutes");
const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const bcrypt = require("bcrypt");
const token = require("../token");

// =====================[LOGIN]==========================
// [Desc]       Admin Login
// [Route]      POST /admin
// [Access]     Admin
const adminLogin = async (reqBody) => {
	const admin = await User.findOne({ username: reqBody.username });
	if (!admin) return false;
	const password = bcrypt.compareSync(reqBody.password, admin.password);
	// Check if password is correct

	if (password === false) return false;
	// Check if user is admin
	if (admin.isAdmin === false) return false;

	return { token: token.createAccessToken(admin), user: admin };
};
// ======================================================

// =====================[USERS]==========================
// [Desc]       Get all users
// [Route]      GET /admin/users
// [Access]     Admin
const getUsers = async (data) => {
	if (!data.isAdmin) return false;

	const users = await User.find({});

	return users;
};

// [Desc]       Set to Admin or User
// [Route]      PUT /admin/users/:userId
// [Access]     Admin
const setAdmin = async (data) => {
	if (!data.isAdmin) return false;

	const user = await User.findByIdAndUpdate(
		data.userId,
		{
			isAdmin: data.reqBody.isAdmin,
		},
		{ new: true }
	);

	return user;
};

// [Desc]       Delete User
// [Route]      DELETE /admin/users/:userId
// [Access]     Admin
const deleteUser = async (data) => {
	if (!data.isAdmin) return false;

	const user = await User.findByIdAndDelete(data.reqBody.userId);

	return user;
};
// ======================================================

// =====================[PRODUCT]==========================
// [Desc]       Add product
// [Route]      POST /admin/products/create
// [Access]     Admin
const addProducts = async (data) => {
	if (!data.isAdmin) return `Unauthorized access`;

	const product = await Product.findOne({ title: data.reqBody.title });

	if (product !== null) return `Product already exist!`;

	let newProduct = new Product({
		title: data.reqBody.title,
		description: data.reqBody.description,
		img: data.reqBody.img,
		categories: data.reqBody.categories,
		price: data.reqBody.price,
	});

	return newProduct.save().then((product, err) => {
		if (err) return false;
		return product;
	});
};

// [Desc]       Get all products
// [Route]      GET /admin/products
// [Access]     Admin
const getProducts = async (data) => {
	if (!data.isAdmin) return false;

	const products = await Product.find({});
	return products;
};

// [Desc]       Get  product
// [Route]      GET /admin/products/:productId
// [Access]     Admin
const getProduct = async (data) => {
	if (!data.isAdmin) return false;

	const product = await Product.findById(data.productId);
	return product;
};

// [Desc]       Update product
// [Route]      PUT /admin/products/:productId/update
// [Access]     Admin
const updateProduct = async (data) => {
	if (!data.isAdmin) return false;

	const product = await Product.findByIdAndUpdate(
		data.productId,
		{
			$set: {
				title: data.reqBody.title,
				description: data.reqBody.description,
				price: data.reqBody.price,
			},
		},
		{ new: true }
	);

	return product;
};

// [Desc]       Update product status
// [Route]      PUT /admin/:productId
// [Access]     Admin
const setStatus = async (data) => {
	if (!data.isAdmin) return false;

	const product = await Product.findByIdAndUpdate(
		data.productId,
		{
			isActive: data.reqBody.isActive,
		},
		{ new: true }
	);

	return true;
};
// [Desc]       Delete product
// [Route]      DELETE /admin/products/:productId
// [Access]     Admin
const deleteItem = async (data) => {
	if (!data.isAdmin) return false;

	const product = await Product.findByIdAndDelete(data.productId);

	return product;
};
// ======================================================

// =====================[ORDERS]==========================

// [Desc]      Get user orders
// [Route]      GET /admin/orders/:userId
// [Access]     Admin
const getOrders = async (data) => {
	if (!data.isAdmin) return false;

	const orders = await Order.find({ userId: data.reqBody.userId });

	return orders;
};
module.exports = {
	adminLogin,
	getUsers,
	addProducts,
	getProducts,
	getProduct,
	updateProduct,
	setStatus,
	deleteItem,
	setAdmin,
	deleteUser,
};
