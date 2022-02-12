const onlyAdmin = require('../HelpersExpress/onlyAdmin');
const { Product, Order, User } = require('../Schemas/AllSchemas');

const router = require('express').Router();

router.use(onlyAdmin);

router.put('/changeProduct/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const { payload } = req.body;

		await Product.findByIdAndUpdate(id, {$set:{ ...payload }});

		const products = await Product.find({}, { __v: 0 }).populate("categoryID", { __v: 0 });
		res.send(products);
	} catch (e) {
		console.log(e);
		res.status(500).send({ err: true, msg: 'Server failed...\n' + e.message });
	}
});

router.post('/newProduct', async (req, res) => {
	try {
		const { payload } = req.body;

		await Product.create({...payload});

		const products = await Product.find({}, { __v: 0 }).populate("categoryID", { __v: 0 });
		res.send(products);
	} catch (e) {
		console.log(e);
		res.status(500).send({ err: true, msg: 'Server failed...\n' + e.message });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params;

		await Product.findByIdAndDelete(id);

		const products = await Product.find({}, { __v: 0 }).populate("categoryID", { __v: 0 });
		res.send(products);
	} catch (e) {
		console.log(e);
		res.status(500).send({ err: true, msg: 'Server failed... Message Given:' + e.message });
	}
});


router.post('/dummyCart', async (req, res) => {
	try {
		const { user } = req.session;

		const cart = await ShoppingCart.create({ userID: user._id });
		await User.findByIdAndUpdate(user._id, { $push: { carts: cart._id } });
		const userUpdatedWithCart = await User.findById(user._id).populate({
			path: "carts",
			select: { __v: 0 },
			populate: { path: "orderID", select: { __v: 0, total: 0, cartID: 0 } },
		});
		req.session.user = userUpdatedWithCart;

		res.send(userUpdatedWithCart);
	} catch (e) {
		console.log(e);
		res.status(500).send({ err: true, msg: "Server failed... Message Given: " + e.message });
	}
});


// router.post('/dummyOrder', async (req, res) => {
// 	try {
// 		const {user} = req.session
// 		const { payload } = req.body;

// 		payload.shipping.date = new Date(payload.shipping.date)

// 		await Order.create({ ...payload });

// 		res.sendStatus(201);
// 	} catch (e) {
// 		console.log(e);
// 		res.status(500).send({ err: true, msg: 'Server failed...\n' + e.message });
// 	}	
// });	


module.exports = router;
