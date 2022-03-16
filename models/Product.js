const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		img: { type: String, required: true },
		categories: String,
		price: { type: Number, required: true },
		isActive: { type: Boolean, default: true },
		inStock: { type: Boolean, default: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
