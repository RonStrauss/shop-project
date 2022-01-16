const onlyLoggedIn = require('../HelpersExpress/onlyLoggedIn');
const onlyUsers = require('../HelpersExpress/onlyUsers');
const { User, ShoppingCart, Product, Order } = require('../Schemas/AllSchemas');
const { getTotal } = require('../Schemas/HelpersSchemas');

const router = require('express').Router();

router.use(onlyLoggedIn);

router.get('/single/:id', async (req, res) => {
	try {
		const { user } = req.session;
		const { id } = req.params;

		const populatedCart = await ShoppingCart.findById(id, { __v: 0 }).populate({ path: 'items', populate: { path: 'productID' } });

		if (!populatedCart) return res.status(404).send({ err: true, msg: "Couldn't find that cart..." });

		if (populatedCart.userID != user._id) return res.status(403).send({ err: true, msg: "You can't edit other users carts!" });

		res.send(populatedCart);
	} catch (e) {
		console.log(e);
		res.status(500).send({ err: true, msg: 'Server failed... ' + 'Message Given: ' + e.message });
	}
});

router.put('/new', async (req, res) => {
	try {
		const { user } = req.session;

		if (user.carts[0] && !user.carts[0].orderID)
			return res.status(400).send({ err: true, msg: "You can't open a new cart until you've finished your previous purchase..." });

		const cart = await ShoppingCart.create({ userID: user._id });
		await User.findByIdAndUpdate(user._id, { $push: { carts: cart._id } });
		const userUpdatedWithCart = await User.findById(user._id, { __v: 0, password: 0 }).populate({ path: 'carts', select:{__v:0}, populate: { path: 'orderID', select:{__v:0} } });
		req.session.user = userUpdatedWithCart;

		res.send(cart);
	} catch (e) {
		console.log(e);
		res.status(500).send({ err: true, msg: 'Server failed... ' + 'Message Given: ' + e.message });
	}
});

router.put('/product/:productID', async (req, res) => {
	try {
		const { user } = req.session;
		const { productID } = req.params;
		const { quantity: requestedQuantity } = req.query;

		if (requestedQuantity && (isNaN(+requestedQuantity) || requestedQuantity > 50))
			return res.status(400).send({ err: true, msg: "Illegal quantity, you're under arrest!" });

		if (!user.carts.length) return res.status(400).send({ err: true, msg: 'Please open a cart before adding a product!' });

		const { _id: cartID } = user.carts[0];

		if (!productID) return res.status(400).send({ err: true, msg: 'Please provide a productID' });

		const queriedProduct = await Product.findById(productID);

		if (!queriedProduct) return res.status(400).send({ err: true, msg: "Couldn't find product." });

		const populatedCart = await ShoppingCart.findById(cartID, { __v: 0 }).populate({ path: 'items.productID', populate: { path: 'categoryID' } });

		if (!populatedCart) return res.status(400).send({ err: true, msg: "Couldn't find that cart..." });

		if (populatedCart.userID != user._id) return res.status(403).send({ err: true, msg: "You can't edit other users carts!" });

		// mongoose doesn't construct nested doc arrays with .find() so I had to recreate the method
		let item;
		populatedCart.items.forEach(itm => {
			if (productID == itm.productID._id) item = itm;
		});

		if (item) {
			if (!requestedQuantity) await ShoppingCart.updateOne({ 'items._id': item._id }, { $pull: { items: { _id: item._id } } });
			await ShoppingCart.updateOne({ 'items._id': item._id }, { $set: { 'items.$.quantity': requestedQuantity } });
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

		const finalShoppingCart = await ShoppingCart.findById(cartID, { __v: 0 }).populate({
			path: 'items.productID',
			select: '-__v',
			populate: { path: 'categoryID', select: '-__v' },
		});

		req.session.user.carts[0] = finalShoppingCart;

		res.send(finalShoppingCart);
	} catch (e) {
		console.log(e);
		res.status(500).send({ err: true, msg: 'Server failed... ' + 'Message Given: ' + e.message });
	}
});

router.delete('/empty-cart', async (req, res) => {
	try {
		const { user } = req.session;

		const requestedCart = await ShoppingCart.findById(user.carts[0]._id, { __v: 0 });

		if (!requestedCart) return res.status(404).send({ err: true, msg: "Couldn't find that cart..." });

		if (requestedCart.userID != user._id) return res.status(403).send({ err: true, msg: "You can't edit other users carts!" });

		await ShoppingCart.findByIdAndUpdate(requestedCart._id, { $set: { items: [], total: 0 } });

		requestedCart.items = [];
		requestedCart.total = 0;

		req.session.user.carts[0] = requestedCart;

		res.send(requestedCart);
	} catch (e) {
		console.log(e);
		res.status(500).send({ err: true, msg: 'Server failed... ' + 'Message Given: ' + e.message });
	}
});

// TODO add credit card validation | connect date validation

router.post('/pay', async (req, res) => {
	try {
		const { user } = req.session;
		const { lastFourCardDigits, city, street, date } = req.body;

		if (!lastFourCardDigits || !city || !street || !date) return res.status(400).send({ err: true, msg: 'Missing parameters' });

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

		await ShoppingCart.findByIdAndUpdate(populatedCart._id, {orderID:createdOrder._id})

		res.send(createdOrder);
	} catch (e) {
		console.log(e);
		res.status(500).send({ err: true, msg: 'Server failed... ' + 'Message Given: ' + e.message });
	}
});

// TODO make receipt accessible only after purchase 

router.get('/receipt', async (req, res) => {
	try {
		const { user } = req.session;

		const populatedCart = await ShoppingCart.findById(user.carts[0]._id, { __v: 0 }).populate({ path: 'items', populate: { path: 'productID' } });

		let text = 'Your receipt is:\n';
		for (const itm of populatedCart.items) {
			text += itm.quantity + ' X ' + itm.productID.name + "\n"
		}
		res.attachment('receipt.txt');
		res.type('txt');
		res.send(text);
	} catch (e) {
		console.log(e);
		res.status(500).send({ err: true, msg: 'Server failed... ' + 'Message Given: ' + e.message });
	}
});

module.exports = router;
