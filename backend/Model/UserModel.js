const mongoose = require("mongoose");
const createSchema = require("../Scripts/createSchema");

const schema = {
	birthDate: { type: Date, default: undefined },
	email: { type: String },
	gender: { type: String, default: undefined },
	name: { type: String, defult: undefined },
	password: { type: String },
	username: { type: String },
	followers: { type: Number, default: 0 },
	following: { type: Number, default: 0 },
	likedPosts: { type: Array, defult: [] },
	defaultProfilePhoto: { type: String },
};

const requiredFields = ["username", "password", "name", "defaultProfilePhoto"];
const userSchema = new mongoose.Schema(createSchema(schema, requiredFields));

module.exports = mongoose.model("user", userSchema);
