const router = require("express").Router();
const productController = require("../controllers/productControllers");
const token = require("../token");

// [Desc]	    Get all active product
// [Access]	    Public
router.get("/", (req, res) => {
	const data = {
		queryNew: req.query.new,
		queryCategory: req.query.category,
	};
	productController
		.activeProducts(data)
		.then((resultFromController) => res.send(resultFromController));
});

// [Desc]	    Get product detailsproduct
// [Access]	    Public
router.get("/:productId", (req, res) => {
	const productId = req.params.productId;

	productController
		.getProduct(productId)
		.then((resultFromController) => res.send(resultFromController));
});

module.exports = router;
