const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const routeHandler = require("./routeHandler");
const cookeiParser = require("cookie-parser");
const getSession = require("./getSession");
require("dotenv/config");

app.use(express.urlencoded());
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookeiParser());
app.use(getSession);

mongoose.connect(process.env.MONGO_CONNECTION_STRING, (err) => {
	if (err) {
		console.log("ERROR WHILE CONNECTING TO DB");
		console.log(err);
	} else {
		console.log("DB CONNECTED");
	}
});

try {
	app.use(routeHandler);
} catch (err) {
	console.log("THERE WAS SOME ERROR IN ONE OF THE ROUTES");
	// mongoose.connection.close();
	mongoose.disconnect();
	console.log(err);
}

app.listen(process.env.PORT, () => {
	console.log(
		`server listeneng on port ${process.env.PORT} http://localhost:${process.env.PORT}`
	);
});
