const { validate } = require('email-validator');
const israeliIdValidator = require('israeli-id-validator');
const onlyLoggedIn = require('../HelpersExpress/onlyLoggedIn');
const { User, City } = require('../Schemas/AllSchemas');

const router = require('express').Router();

router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) return res.status(400).send({ err: true, msg: 'Missing Username Or Password' });

		const user = await User.find({ email, password }, { __v: 0, password: 0, carts: { $slice: -1 } }).populate({
			path: 'carts',
			select: { __v: 0 },
			populate: { path: 'orderID', select: { __v: 0, total: 0, cartID: 0 } },
		});

		if (!user.length) return res.status(400).send({ err: true, msg: 'Wrong Email Or Password' });

		req.session.user = user[0];

		return res.send(user[0]);
	} catch (e) {
		console.log(e);
		res.status(500).send({ err: true, msg: 'Server failed...\n' + e.message });
	}
});

router.post('/isCredentialInUse', async (req, res) => {
	try {
		const { _id, email } = req.body;

		if (!_id && !email) return res.status(400).send({ err: true, msg: 'What are you trying to check lol' });

		const user = await User.find(_id ? { _id } : { email }).countDocuments();

		res.send({ credentialInUser: user });
	} catch (e) {
		console.log(e);
		res.status(500).send({ err: true, msg: 'Server failed... ' + 'Message Given: ' + e.message });
	}
});

router.post('/register', async (req, res) => {
	try {
		const { email, _id, password, first, last, city, street } = req.body;

		if (!email || !password || !_id || !first || !last || !city || !street) return res.status(400).send({ err: true, msg: 'Missing parameters' });

		if (!validate(email) || !israeliIdValidator(_id)) return res.status(400).send({ err: true, msg: 'Not gonna work bruh' });

		const user = await User.find({ $or: [{ _id }, { email }] });

		if (user.length) return res.status(400).send({ err: true, msg: 'Something failed.' });

		const isCityInList = await City.findById(city);

		if (!isCityInList) return res.status(400).send({ err: true, msg: "Whoops! That shouldn't have happened.." });

		await User.create({ email: email.toLowerCase(), _id, password, name: { first, last }, address: { city, street } });

		return res.sendStatus(201);
	} catch (e) {
		console.log(e.message);
		res.status(500).send({ err: true, msg: 'Server failed... Please try again later' });
	}
});

router.delete('/logout', onlyLoggedIn, (req, res) => {
	try {
		req.session.destroy();
		res.send({ msg: 'Logged out successfully' });
	} catch (e) {
		console.log(e.message);
		res.status(500).send({ err: true, msg: 'Server failed... Please try again later' });
	}
});
module.exports = router;
