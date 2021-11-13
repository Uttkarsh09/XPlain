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

mongoose.connect(process.env.MONGO_CONNECTION_STRING, () => {
	console.log("DB CONNECTED");
});

app.use(routeHandler);

app.listen(process.env.PORT, () => {
	console.log(
		`server listeneng on port ${process.env.PORT} http://localhost:${process.env.PORT}`
	);
});
