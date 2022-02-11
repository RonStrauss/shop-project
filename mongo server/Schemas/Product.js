const { Schema, model } = require('mongoose');
const { stringRequired, numberRequired } = require('./HelperTypes');

const ProductSchema = new Schema({
	name: stringRequired,
	categoryID: { ref: 'Category', ...stringRequired },
	priceInteger: {
		...numberRequired,
		min: 0,
		max: 99999,
	},
	priceDecimal: { type: Number, min: 0, max: 99, default: 0 },
	imageURL: { type: String, default: '/assets/no_image_available.jpg' },
	isInWeight: { type: Boolean, default: false },
});

module.exports = model('Product', ProductSchema);
