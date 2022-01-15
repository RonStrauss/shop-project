const { Schema, model } = require('mongoose');
const { stringRequired, numberRequired } = require('./HelperTypes');

module.exports = model(
	'Order',
	new Schema({
		cartID: { type: Schema.Types.ObjectId, ref: 'Cart', required: true },
		total: { ...numberRequired, max: 99999 },
		shipping: {
			city: stringRequired,
			street: stringRequired,
			date: { type: Date, required: true },
		},
		dateMade: {
			type: Date,
			default: () => Date.now(),
		},
		lastFourCardDigits: { ...stringRequired, minlength: 4, maxlength: 4 },
	})
);
