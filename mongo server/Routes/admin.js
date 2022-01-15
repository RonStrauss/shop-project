const onlyAdmin = require('../HelpersExpress/onlyAdmin');
const { Product } = require('../Schemas/AllSchemas');

const router = require('express').Router();

router.use(onlyAdmin);

router.patch('/changeProduct/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const { payload } = req.body;

		await Product.findByIdAndUpdate(id, { ...payload });

		res.sendStatus(201);
	} catch (e) {
		console.log(e);
		res.status(500).send({ err: true, msg: 'Server failed...\n' + e.message });
	}
});

router.post('/newProduct', async (req, res) => {
	try {
		const { id } = req.params;
		const { payload } = req.body;

		await Product.create(id, { ...payload });

		res.sendStatus(201);
	} catch (e) {
		console.log(e);
		res.status(500).send({ err: true, msg: 'Server failed...\n' + e.message });
	}
});

module.exports = router;
