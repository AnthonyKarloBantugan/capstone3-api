const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

// [Create Token]
const createAccessToken = (user) => {
	const data = {
		id: user._id,
		firstName: user.firstName,
		lastName: user.lastName,
		username: user.username,
		email: user.email,
		isAdmin: user.isAdmin,
	};
	return jwt.sign(data, secret, {});
};

// [Verify Token]
const verify = (req, res, next) => {
	let token = req.headers.authorization;
	if (token === undefined) {
		return null;
	}

	token = token.slice(7, token.length);

	return jwt.verify(token, secret, (err, data) => {
		if (err) {
			return err;
		}
		next();
	});
};

// [Decrypt Token]
const decode = (token) => {
	if (token === undefined) {
		return null;
	}

	token = token.slice(7, token.length);

	return jwt.verify(token, secret, (err, data) => {
		if (err) {
			return null;
		}
		return jwt.decode(token, { complete: true }).payload;
	});
};

module.exports = {
	createAccessToken,
	verify,
	decode,
};
