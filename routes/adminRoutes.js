const router = require("express").Router();
const adminController = require("../controllers/adminControllers");
const token = require("../token");
// =====================[LOGIN]==========================
// [Desc]       Admin login
// [Access]     Admin
router.post("/", (req, res) => {
	const reqBody = req.body;
	adminController
		.adminLogin(reqBody)
		.then((resultFromController) =>
			res.status(201).send(resultFromController)
		);
});
// ======================================================

// =====================[USERS]==========================
// [Desc]       Get all users
// [Access]     Admin
router.get("/users", token.verify, (req, res) => {
	const data = token.decode(req.headers.authorization);

	adminController
		.getUsers(data)
		.then((resultFromController) =>
			res.status(201).send(resultFromController)
		);
});

// [Desc]       Set to Admin or User
// [Access]     Admin
router.put("/users/:userId", token.verify, (req, res) => {
	const data = {
		userId: req.params.userId,
		isAdmin: token.decode(req.headers.authorization).isAdmin,
		reqBody: req.body,
	};

	adminController
		.setAdmin(data)
		.then((resultFromController) =>
			res.status(201).send(resultFromController)
		);
});

// [Desc]       Delete User
// [Access]     Admin
router.delete("/users", token.verify, (req, res) => {
	const data = {
		reqBody: req.body,
		isAdmin: token.decode(req.headers.authorization).isAdmin,
	};

	adminController
		.deleteUser(data)
		.then((resultFromController) =>
			res.status(201).send(resultFromController)
		);
});
// ======================================================

// =====================[PRODUCT]==========================
// [Desc]       Add product
// [Access]     Admin
router.post("/products/create", token.verify, (req, res) => {
	const data = {
		isAdmin: token.decode(req.headers.authorization).isAdmin,
		payload: token.decode(req.headers.authorization),
		reqBody: req.body,
	};

	adminController
		.addProducts(data)
		.then((resultFromController) =>
			res.status(201).send(resultFromController)
		);
});

// [Desc]       Get all products
// [Access]     Admin
router.get("/products", token.verify, (req, res) => {
	const data = token.decode(req.headers.authorization);

	adminController
		.getProducts(data)
		.then((resultFromController) =>
			res.status(201).send(resultFromController)
		);
});

// [Desc]      Specific product
// [Access]     Admin
router.get("/products/:productId", token.verify, (req, res) => {
	const data = {
		productId: req.params.productId,
		isAdmin: token.decode(req.headers.authorization).isAdmin,
	};

	adminController
		.getProduct(data)
		.then((resultFromController) =>
			res.status(201).send(resultFromController)
		);
});

// [Desc]       Update product
// [Access]     Admin
router.put("/products/:productId/update", token.verify, (req, res) => {
	const data = {
		productId: req.params.productId,
		isAdmin: token.decode(req.headers.authorization).isAdmin,
		reqBody: req.body,
	};

	adminController
		.updateProduct(data)
		.then((resultFromController) =>
			res.status(201).send(resultFromController)
		);
});

// [Desc]       Activate/Deavtivate product
// [Access]     Admin
router.put("/products/:productId", token.verify, (req, res) => {
	const data = {
		productId: req.params.productId,
		isAdmin: token.decode(req.headers.authorization).isAdmin,
		reqBody: req.body,
	};

	adminController
		.setStatus(data)
		.then((resultFromController) =>
			res.status(201).send(resultFromController)
		);
});

// [Desc]       Delete product
// [Access]     Admin
router.delete("/products/:productId", token.verify, (req, res) => {
	const data = {
		productId: req.params.productId,
		isAdmin: token.decode(req.headers.authorization).isAdmin,
	};

	adminController
		.deleteItem(data)
		.then((resultFromController) =>
			res.status(201).send(resultFromController)
		);
});
// ======================================================

// =====================[ORDER]==========================

// [Desc]       Check User Orders
// [Access]     Admin
router.get("/orders/:userId", token.verify, (req, res) => {
	const data = {
		userId: req.params.userId,
		isAdmin: token.decode(req.headers.authorization).isAdmin,
		reqBody: req.body,
	};

	adminController
		.getOrders(data)
		.then((resultFromController) =>
			res.status(201).send(resultFromController)
		);
});

module.exports = router;
