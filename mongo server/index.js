const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
const initialDB = require('./initialDB');

const app = express();

app.use(express.json());

app.use(
	require('express-session')({
		secret: 'UtterClusterFuck',
		resave: false,
		saveUninitialized: true,
	})
);

app.use(
	require('cors')({
		credentials: true,
		origin: 'http://localhost:4200',
	})
);

(async () => {
	try {
		// Run to initialize ronShopDB on localhost
		await initialDB();
	} catch (e) {
		console.log(e);
	}
})();

app.use('/auth', require('./Routes/auth'));
app.use('/lists', require('./Routes/lists'));
app.use('/admin', require('./Routes/admin'));
app.use('/cart', require('./Routes/cart'));

app.listen(1000, () => {
	console.log(`Running on :1000!
http://localhost:1000`);
});

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
