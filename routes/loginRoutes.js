const router = require("express").Router();
const loginController = require("../controllers/loginControllers");

// [Desc]       Register
// [Access]     Public
router.post("/register", (req, res) => {
	loginController
		.register(req.body)
		.then((resultFromController) =>
			res.status(201).send(resultFromController)
		);
});

// [Desc]       Login
// [Access]     Public
router.post("/login", (req, res) => {
	loginController.login(req.body).then((resultFromController) => {
		res.status(201).send(resultFromController);
	});
});

module.exports = router;
