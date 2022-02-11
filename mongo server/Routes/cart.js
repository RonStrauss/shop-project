const onlyLoggedIn = require('../HelpersExpress/onlyLoggedIn');
const onlyUsers = require('../HelpersExpress/onlyUsers');
const { User, ShoppingCart, Product, Order } = require('../Schemas/AllSchemas');
const { getTotal } = require('../Schemas/HelpersSchemas');

const router = require('express').Router();

router.use(onlyLoggedIn);

router.put('/new', async (req, res) => {
	try {
		const { user } = req.session;

		if (user.carts[0] && !user.carts[0].orderID)
			return res.status(400).send({ err: true, msg: "You can't open a new cart until you've finished your previous purchase..." });

		const cart = await ShoppingCart.create({ userID: user._id });
		await User.findByIdAndUpdate(user._id, { $push: { carts: cart._id } });
		const userUpdatedWithCart = await User.findById(user._id, { __v: 0, password: 0, carts: { $slice: -1 } }).populate({
			path: 'carts',
			select: { __v: 0 },
			populate: { path: 'orderID', select: { __v: 0, total: 0, cartID: 0 } },
		});
		req.session.user = userUpdatedWithCart;

		res.send(userUpdatedWithCart);
	} catch (e) {
		console.log(e);
		res.status(500).send({ err: true, msg: 'Server failed... Message Given: ' + e.message });
	}
});

router.put('/product/:productID', async (req, res) => {
	try {
		const { user } = req.session;
		const { productID } = req.params;
		const { quantity: requestedQuantity } = req.query;

		if (requestedQuantity && (isNaN(+requestedQuantity) || requestedQuantity > 50))
			return res.status(400).send({ err: true, msg: "Illegal quantity, you're under arrest!" });

		if (!user.carts.length || user.carts[0].orderID) return res.status(400).send({ err: true, msg: "Can't add to that cart!" });

		const { _id: cartID } = user.carts[0];

		if (!productID) return res.status(400).send({ err: true, msg: 'Please provide a productID' });

		const queriedProduct = await Product.findById(productID);

		if (!queriedProduct) return res.status(400).send({ err: true, msg: "Couldn't find product." });

		const populatedCart = await ShoppingCart.findById(cartID, { __v: 0 }).populate({ path: 'items.productID', populate: { path: 'categoryID' } });

		if (!populatedCart) return res.status(404).send({ err: true, msg: "Couldn't find that cart..." });

		if (populatedCart.userID != user._id) return res.status(403).send({ err: true, msg: "You can't edit other users carts!" });

		// mongoose doesn't construct nested doc arrays with .find() so I had to recreate the method
		let item;
		populatedCart.items.forEach(itm => {
			if (productID == itm.productID._id) item = itm;
		});

		if (item) {
			if (requestedQuantity == 0) {
				await ShoppingCart.updateOne({ 'items._id': item._id }, { $pull: { items: { _id: item._id, productID, quantity: item.quantity } } });
			} else {
				await ShoppingCart.updateOne({ 'items._id': item._id }, { $set: { 'items.$.quantity': requestedQuantity } });
			}
		} else {
			if (!requestedQuantity) return res.status(400).send({ err: true, msg: 'Must provide quantity to add...' });
			await ShoppingCart.findByIdAndUpdate(cartID, {
				$push: { items: { productID, quantity: requestedQuantity } },
			});
		}

		const cartSetTotal = await ShoppingCart.findById(cartID).populate('items.productID');

		const { integer, decimal } = getTotal(cartSetTotal);

		await ShoppingCart.findByIdAndUpdate(cartID, {
			$set: { total: `${integer}.${decimal}` },
		});

		const finalShoppingCart = await ShoppingCart.findById(cartID, { __v: 0 });

		req.session.user.carts[0] = finalShoppingCart;

		res.send(req.session.user);
	} catch (e) {
		console.log(e);
		res.status(500).send({ err: true, msg: 'Server failed... Message Given: ' + e.message });
	}
});

router.delete('/empty-cart', async (req, res) => {
	try {
		const { user } = req.session;

		const requestedCart = await ShoppingCart.findById(user.carts[0]._id, { __v: 0 });

		if (!requestedCart) return res.status(404).send({ err: true, msg: "Couldn't find that cart..." });

		if (requestedCart.userID != user._id) return res.status(403).send({ err: true, msg: "You can't edit other users carts!" });

		await ShoppingCart.findByIdAndUpdate(requestedCart._id, { $set: { items: [], total: 0 } });

		user.carts[0].items = [];
		user.carts[0].total = 0;

		res.send(user);
	} catch (e) {
		console.log(e);
		res.status(500).send({ err: true, msg: 'Server failed... Message Given: ' + e.message });
	}
});

// TODO add credit card validation

router.post('/pay', async (req, res) => {
	try {
		const { user } = req.session;
		const { lastFourCardDigits, city, street, date: unconvertedDate } = req.body;

		if (!lastFourCardDigits || !city || !street || !unconvertedDate) return res.status(400).send({ err: true, msg: 'Missing parameters' });

		const tempDate = new Date(unconvertedDate);

		if (isNaN(tempDate.valueOf())) return res.status(400).send({ err: true, msg: 'Please provide a valid date' });

		//TODO date check only working for gmt+2, adjust for international

		tempDate.setTime(tempDate.getTime() + 1000 * 60 * 60 * 2);

		const date = new Date(new Date(tempDate).toISOString().split('T')[0]);

		const today = new Date(new Date().toISOString().split('T')[0]);

		if (date.valueOf() < today.valueOf()) return res.status(400).send({ err: true, msg: 'Please provide a valid date' });

		const populatedCart = await ShoppingCart.findById(user.carts[0]._id, { __v: 0 }).populate({ path: 'items', populate: { path: 'productID' } });

		if (!populatedCart) return res.status(404).send({ err: true, msg: "Couldn't find that cart..." });

		if (populatedCart.userID != user._id) return res.status(403).send({ err: true, msg: "You can't edit other users carts!" });

		const createdOrder = await Order.create({
			userID: user._id,
			cartID: populatedCart._id,
			total: populatedCart.total,
			shipping: { city, street, date },
			lastFourCardDigits,
		});

		await ShoppingCart.findByIdAndUpdate(populatedCart._id, { orderID: createdOrder._id });

		const updatedUser = await User.findById(user._id, { __v: 0, password: 0, carts: { $slice: -1 } }).populate({
			path: 'carts',
			select: { __v: 0 },
			populate: { path: 'orderID', select: { __v: 0, total: 0, cartID: 0 } },
		});

		req.session.user = updatedUser;

		res.send(updatedUser);
	} catch (e) {
		console.log(e);
		res.status(500).send({ err: true, msg: 'Server failed... Message Given: ' + e.message });
	}
});

// TODO make receipt accessible only after purchase

router.get('/receipt', async (req, res) => {
	try {
		const { user } = req.session;

		const populatedCart = await ShoppingCart.findById(user.carts[0]._id, { __v: 0 }).populate({ path: 'items', populate: { path: 'productID' } });

		let text = 'Your receipt is:\n';
		for (const itm of populatedCart.items) {
			text += itm.quantity + ' X ' + itm.productID.name + '\n';
		}
		text += 'Costing a total of: ' + populatedCart.total;
		res.attachment('receipt.txt');
		res.type('txt');
		res.send(text);
	} catch (e) {
		console.log(e);
		res.status(500).send({ err: true, msg: 'Server failed... Message Given: ' + e.message });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const { user } = req.session;
		const { id } = req.params;

		const populatedCart = await ShoppingCart.findById(id, { __v: 0 }).populate({ path: 'items', populate: { path: 'productID' } });

		if (!populatedCart) return res.status(404).send({ err: true, msg: "Couldn't find that cart..." });

		if (populatedCart.userID != user._id) return res.status(403).send({ err: true, msg: "You can't edit other users carts!" });

		res.send(populatedCart);
	} catch (e) {
		console.log(e);
		res.status(500).send({ err: true, msg: 'Server failed... Message Given: ' + e.message });
	}
});

module.exports = router;
