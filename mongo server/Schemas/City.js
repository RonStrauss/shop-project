const { Schema, model } = require("mongoose");
const { stringRequired } = require("./HelperTypes");

module.exports = model(
	"City",
	new Schema({
		_id: {
			...stringRequired,
		},
	})
);
