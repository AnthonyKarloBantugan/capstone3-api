const router = require("../routes/userRoutes");
const User = require("../models/User");

const profile = async (data) => {
	const user = await User.findById(data.userId);
	return user;
};

const updateProfile = async (data) => {
	const user = await User.findByIdAndUpdate(
		data.userId,
		{
			firstName: data.reqBody.firstName,
			lastName: data.reqBody.lastName,
			username: data.reqBody.username,
			email: data.reqBody.email,
			password: data.reqBody.password,
			mobile: data.reqBody.mobile,
		},
		{ new: true }
	);
	if (user._id != data.payload.id) return `Invalid access`;

	const emailExist = await User.find({ email: data.reqBody.email });
	if (emailExist) return `Email already exist`;

	if (
		!data.reqBody.firstName ||
		!data.reqBody.lastName ||
		!data.reqBody.username ||
		!data.reqBody.email ||
		!data.reqBody.password ||
		!data.reqBody.mobile
	)
		return `Pleas fill all fields`;

	return user;
};

module.exports = { profile, updateProfile };
