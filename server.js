// [Dependecies]
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// [Modules]
const loginRoutes = require("./routes/loginRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const stripeRoutes = require("./routes/stripeRoutes");
const orderRoutes = require("./routes/orderRoutes");

// [Evironment Variables Setup]
const dotenv = require("dotenv");
dotenv.config();

// [Server Setup]
const app = express();
const port = process.env.PORT || 5000;

// [Database Connection]
mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log(`Connected to MongoDB`))
	.catch((err) => console.log(err));

// [Middlewares]
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// [Routes]
app.use("/auth", loginRoutes);
app.use("/admin", adminRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/checkout", stripeRoutes);
app.use("/orders", orderRoutes);

// [Server Response]
app.listen(5000, () => console.log(`Server running on port ${port}`));
