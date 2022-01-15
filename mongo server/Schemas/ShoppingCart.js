const { Schema, model } = require('mongoose');

const cartSchema = new Schema({
	userID: { type: Number, ref: 'User', required: true },
	orderID: { type: Schema.Types.ObjectId, ref: 'Order' },
	createdAt: {
		type: Date,
		default: () => Date.now(),
	},
	items: [
		{
			productID: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
			quantity: {
				type: Number,
				max: 99,
				default: 1,
			},
		},
	],
	total: {
		type: Number,
		default: 0,
		max: 99999,
		min: 0,
	},
});

module.exports = model('Cart', cartSchema);
