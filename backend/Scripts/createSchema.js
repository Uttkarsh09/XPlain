function createSchema(schema, requiredFields) {
	requiredFields.forEach((field) => {
		schema[field].required = true;
	});
	return schema;
}

module.exports = createSchema;
