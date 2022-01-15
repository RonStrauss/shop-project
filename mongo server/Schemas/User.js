const { Schema, model } = require('mongoose');
const idValidator = require('israeli-id-validator');
const { validate: emailValidator } = require('email-validator');
const { numberRequired, stringRequired } = require('./HelperTypes');

module.exports = model(
	'User',
	new Schema({
		_id: {
			...numberRequired,
			validate: {
				validator: function (id) {
					return idValidator(id);
				},
				message: 'Invalid ID',
			},
		},
		email: {
			...stringRequired,
			lowercase: true,
			validate: {
				validator: function (email) {
					return emailValidator(email);
				},
				message: 'Email is invalid, please enter a valid email',
			},
		},
		password: stringRequired,
		role: {
			type: String,
			default: 'user',
		},
		name: {
			first: stringRequired,
			last: stringRequired,
		},
		address: {
			city: { ...stringRequired, ref: 'City' },
			street: stringRequired,
		},
		carts: [{ type: Schema.Types.ObjectId, ref: 'Cart' }],
	})
);
