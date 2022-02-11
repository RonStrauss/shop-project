const onlyLoggedIn = require('../HelpersExpress/onlyLoggedIn');
const { Product, Order, City, Category } = require('../Schemas/AllSchemas');

const router = require('express').Router();

router.get('/orders-and-products-count', async (req, res) => {
	try {
		const orders = await Order.find({}, { __v: 0 }).countDocuments();
		const products = await Product.find({}, { __v: 0 }).countDocuments();

		res.send({ orders, products });
	} catch (e) {
		console.log(e);
		res.status(500).send({ err: true, msg: 'Server failed... ' + 'Message Given: ' + e.message });
	}
});

router.get('/cities', async (req, res) => {
	try {
		const cities = await City.find({}, { __v: 0 });

		res.send(cities.map(cit => cit._id));
	} catch (e) {
		console.log(e);
		res.status(500).send({ err: true, msg: 'Server failed... ' + 'Message Given: ' + e.message });
	}
});

// router.use(onlyLoggedIn);

router.get('/products-categories', async (req, res) => {
	try {
		const products = await Product.find({}, { __v: 0 }).populate('categoryID', { __v: 0 });
		res.send(products);
	} catch (e) {
		console.log(e);
		res.status(500).send({ err: true, msg: 'Server failed... ' + 'Message Given: ' + e.message });
	}
});

router.get('/categories', async (req, res) => {
	try {
		const categories = await Category.find({}, { __v: 0 });

		res.send(categories.map(cat => cat._id));
	} catch (e) {
		console.log(e);
		res.status(500).send({ err: true, msg: 'Server failed... ' + 'Message Given: ' + e.message });
	}
});

router.get('/product-search', async (req, res) => {
	try {
		const { query } = req.query;
		if (!query) return res.send();

		const results = await Product.find(
			{
				name: new RegExp(query, 'i'),
			},
			{ __v: 0 }
		);
		res.send(results);
	} catch (e) {
		console.log(e);
		res.status(500).send({ err: true, msg: 'Server failed... ' + 'Message Given: ' + e.message });
	}
});

router.get('/order', async (req, res) => {
	try {
		const date = new Date(new Date(req.query?.date)?.toISOString().split('T')[0]);

		const today = new Date(new Date().toISOString().split('T')[0]);

		if (isNaN(date.valueOf()) || date.valueOf() < today.valueOf()) return res.status(400).send({ err: true, msg: 'Please provide a valid date' });

		const orders = await Order.find({ 'shipping.date': { $eq: date } }, { __v: 0 }).countDocuments();

		res.send({ orders });
	} catch (e) {
		console.log(e);
		res.status(500).send({ err: true, msg: 'Server failed... ' + 'Message Given: ' + e.message });
	}
});

module.exports = router;
