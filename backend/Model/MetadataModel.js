const mongoose = require("mongoose");
const createSchema = require("../Scripts/createSchema");

const schema = {
	suggestions: { type: Array },
};

const requiredFields = ["suggestions"];

const blogSchema = new mongoose.Schema(createSchema(schema, requiredFields));
module.exports = mongoose.model("metadata", blogSchema);
