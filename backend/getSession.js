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
	session({
		store: MongoStore.create({
			mongoUrl: process.env.MONGO_CONNECTION_STRING,
			ttl: 2 * 60 * 1000, //Default 14 days
			collectionName: "sessions",
		}),
		name: "XPlainSessionID",
		secret: process.env.SESSION_SECERET_KEY,
		saveUninitialized: true,
		resave: false,
		cookie: {
			maxAge: 14 * 24 * 60 * 60 * 1000,
			httpOnly: false,
			secure: false,
		},
	})
);

module.exports = router;
