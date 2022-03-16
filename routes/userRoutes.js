const router = require("express").Router();
const userController = require("../controllers/userControllers");
const token = require("../token");

// [Desc]	    Get user details
// [Access]	    User Only
router.get("/profile/:userId", token.verify, (req, res) => {
	const data = {
		userId: req.params.userId,
		payload: token.decode(req.headers.authorization),
	};

	userController
		.profile(data)
		.then((resultFromController) =>
			res.status(201).send(resultFromController)
		);
});

// [Desc]	    Update user details
// [Access]	    User Only
router.put("/:userId/profile", token.verify, (req, res) => {
	const data = {
		userId: req.params.userId,
		payload: token.decode(req.headers.authorization),
		reqBody: req.body,
	};

	userController
		.updateProfile(data)
		.then((resultFromController) =>
			res.status(201).send(resultFromController)
		);
});

module.exports = router;
