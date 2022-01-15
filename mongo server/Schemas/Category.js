const { Schema, model } = require("mongoose");
const { stringRequired } = require("./HelperTypes");

module.exports = model(
	"Category",
	new Schema({
		_id: stringRequired,
	})
);
