const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/blaze-order-app", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
.then(() => console.log("Database connected!"))
.catch(err => console.log("Something went wrong", err));
