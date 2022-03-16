const router = require("../routes/loginRoutes");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const token = require("../token");

// [Desc]       Register
// [Route]      POST /register
// [Access]     Public
const register = async (reqBody) => {
	// Check if all fields are filled by user
	if (
		!reqBody.fullName ||
		!reqBody.address ||
		!reqBody.username ||
		!reqBody.email ||
		!reqBody.password ||
		!reqBody.confirmPassword ||
		!reqBody.mobile
	)
		return false;

	// Check if password match
	if (reqBody.confirmPassword !== reqBody.password) {
		return false;
	}

	const emailExist = await User.find({ email: reqBody.email });

	const newUser = new User({
		fullName: reqBody.fullName,
		address: reqBody.address,
		username: reqBody.username,
		email: reqBody.email,
		mobile: reqBody.mobile,
		password: bcrypt.hashSync(reqBody.password, 10),
	});
	// Checks if email already exist
	if (emailExist.length > 0) return false;

	return newUser.save().then((user, err) => {
		if (err) return err;
		return user;
	});
};

// [Desc]       Login
// [Route]      POST /Login
// [Access]     Public
const login = async (reqBody) => {
	const user = await User.findOne({ username: reqBody.username });

	// Check if username exist
	if (!user) return false;

	const password = bcrypt.compareSync(reqBody.password, user.password);
	// Check if password is correct
	if (password === false) return false;

	return {
		user: user,
		token: token.createAccessToken(user),
	};
};

module.exports = {
	register,
	login,
};
