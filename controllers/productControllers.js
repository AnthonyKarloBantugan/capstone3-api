const router = require("../routes/productRoutes");
const Product = require("../models/Product");

// [Desc]	    Get all active product
// [Route]	    GET /products
// [Access]	    Public
const activeProducts = async (data) => {
	const products = await Product.find({ isActive: true });

	return products;
};

// [Desc]	    Get product details
// [Route]	    GET /products/:productId
// [Access]	    Public
const getProduct = async (productId) => {
	const product = await Product.findById(productId);

	return product;
};

module.exports = {
	activeProducts,
	getProduct,
};
