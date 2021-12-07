const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
require("dotenv/config");
const router = express.Router();

router.use((req, res, next) => {
	console.log(`Getting the session | PATH -> ${req.path}`);
	next();
});

router.use(
	(_, __, next) => {
		console.log("Accessing/Creating the session");
		next();
	},
	session({
		store: MongoStore.create({
			mongoUrl: process.env.MONGO_CONNECTION_STRING,
			ttl: 1000 * 60 * 60 * 24 * 3, //Default 14 days
			collectionName: "sessions",
		}),
		name: "XPlainSessionID",
		secret: process.env.SESSION_SECERET_KEY,
		saveUninitialized: false,
		resave: false,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 3,
			httpOnly: false,
			secure: false,
			path: "/", // Default
		},
	})
);

module.exports = router;
