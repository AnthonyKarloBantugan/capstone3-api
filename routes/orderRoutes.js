const router = require("express").Router();
const orderController = require("../controllers/orderControllers");
const token = require("../token");

// [Desc]       Create Order
// [Access]     User
router.post("/", token.verify, (req, res) => {
	const data = {
		token: req.headers.authorization,
		reqBody: req.body,
	};
	orderController
		.createOrder(data)
		.then((resultFromController) =>
			res.status(201).send(resultFromController)
		);
});

// [Desc]       Get user orders
// [Access]     User
router.get("/:userId", token.verify, (req, res) => {
	const data = {
		userId: req.params.userId,
		payload: token.decode(req.headers.authorization),
	};
	orderController
		.userOrders(data)
		.then((resultFromController) =>
			res.status(201).send(resultFromController)
		);
});

module.exports = router;
