const express = require('express');
const mongoose = require('mongoose');
const { User, ShoppingCart, Category, Product, Order, City } = require('./Schemas/AllSchemas');

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
		await mongoose.connect('mongodb://localhost/ronShopDB');
		await initialDB();
	} catch (e) {}
})();

app.use('/auth', require('./Routes/auth'));
app.use('/lists', require('./Routes/lists'));
app.use('/admin', require('./Routes/admin'));
app.use('/cart', require('./Routes/cart'));

async function initialDB() {
	try {
		return new Promise(async (res, rej) => {
			const citiesCount = await City.find({}).countDocuments();
			let cities, admin, categories, products;
			cities = citiesCount
				? true
				: await City.insertMany([
						{
							_id: 'Acre',
						},
						{
							_id: 'Afula',
						},
						{
							_id: 'Arad',
						},
						{
							_id: 'Arraba',
						},
						{
							_id: 'Ashdod',
						},
						{
							_id: 'Ashkelon',
						},
						{
							_id: 'Baqa al-Gharbiyye',
						},
						{
							_id: 'Bat Yam',
						},
						{
							_id: 'Beersheba',
						},
						{
							_id: "Beit She'an",
						},
						{
							_id: 'Beit Shemesh',
						},
						{
							_id: 'Bnei Brak',
						},
						{
							_id: 'Dimona',
						},
						{
							_id: 'Eilat',
						},
						{
							_id: "El'ad",
						},
						{
							_id: "Giv'at Shmuel",
						},
						{
							_id: 'Givatayim',
						},
						{
							_id: 'Hadera',
						},
						{
							_id: 'Haifa',
						},
						{
							_id: 'Herzliya',
						},
						{
							_id: 'Hod HaSharon',
						},
						{
							_id: 'Holon',
						},
						{
							_id: 'Jerusalem',
						},
						{
							_id: 'Kafr Qasim',
						},
						{
							_id: 'Karmiel',
						},
						{
							_id: 'Kfar Saba',
						},
						{
							_id: 'Kfar Yona',
						},
						{
							_id: 'Kiryat Ata',
						},
						{
							_id: 'Kiryat Bialik',
						},
						{
							_id: 'Kiryat Gat',
						},
						{
							_id: 'Kiryat Malakhi',
						},
						{
							_id: 'Kiryat Motzkin',
						},
						{
							_id: 'Kiryat Ono',
						},
						{
							_id: 'Kiryat Shmona',
						},
						{
							_id: 'Kiryat Yam',
						},
						{
							_id: 'Lod',
						},
						{
							_id: "Ma'alot-Tarshiha",
						},
						{
							_id: 'Migdal HaEmek',
						},
						{
							_id: "Modi'in-Maccabim-Re'ut",
						},
						{
							_id: 'Nahariya',
						},
						{
							_id: 'Nazareth',
						},
						{
							_id: 'Nesher',
						},
						{
							_id: 'Ness Ziona',
						},
						{
							_id: 'Netanya',
						},
						{
							_id: 'Netivot',
						},
						{
							_id: 'Nof HaGalil',
						},
						{
							_id: 'Ofakim',
						},
						{
							_id: 'Or Akiva',
						},
						{
							_id: 'Or Yehuda',
						},
						{
							_id: 'Petah Tikva',
						},
						{
							_id: 'Qalansawe',
						},
						{
							_id: "Ra'anana",
						},
						{
							_id: 'Rahat',
						},
						{
							_id: 'Ramat Gan',
						},
						{
							_id: 'Ramat HaSharon',
						},
						{
							_id: 'Ramla',
						},
						{
							_id: 'Rehovot',
						},
						{
							_id: 'Rishon LeZion',
						},
						{
							_id: 'Rosh HaAyin',
						},
						{
							_id: 'Safed',
						},
						{
							_id: 'Sakhnin',
						},
						{
							_id: 'Sderot',
						},
						{
							_id: "Shefa-'Amr",
						},
						{
							_id: 'Tamra',
						},
						{
							_id: 'Tayibe',
						},
						{
							_id: 'Tel Aviv-Yafo',
						},
						{
							_id: 'Tiberias',
						},
						{
							_id: 'Tira',
						},
						{
							_id: 'Tirat Carmel',
						},
						{
							_id: 'Umm al-Fahm',
						},
						{
							_id: 'Yavne',
						},
						{
							_id: 'Yehud-Monosson',
						},
						{
							_id: 'Yokneam Illit',
						},
				  ]);

			const adminCount = await User.find({ role: 'admin' }).countDocuments();
			admin = adminCount
				? true
				: await User.create({
						_id: 305360943,
						name: { first: 'admin', last: 'admin' },
						email: 'admin@admin.admin',
						address: { city: 'Jerusalem', street: "Ha'nevi'im 14" },
						password: 'adminadmin123',
						role: 'admin',
				  });
			const categoriesCount = await Category.find({}).countDocuments();
			categories = categoriesCount
				? true
				: await Category.insertMany([
						{ _id: 'Dairy & Eggs' },
						{ _id: 'Fresh Produce' },
						{ _id: 'Meat & Fish' },
						{ _id: 'Bakery & Bread' },
						{ _id: 'Frozen' },
						{ _id: 'Snacks & Candy' },
						{ _id: 'Beverages' },
						{ _id: 'Canned & Jarred' },
						{ _id: 'Cleaners & Personal Hygiene' },
						{ _id: 'Household Items' },
				  ]);
			const productsCount = await Product.find({}).countDocuments();
			products = productsCount
				? true
				: await Product.insertMany([
						{ name: 'Milk', categoryID: 'Dairy & Eggs', priceInteger: 8, priceDecimal: 90 },
						{ name: 'Tomatoes', categoryID: 'Fresh Produce', priceInteger: 2, priceDecimal: 0, isInWeight: true },
						{ name: 'Fresh Shrimp', categoryID: 'Meat & Fish', priceInteger: 39, priceDecimal: 90, isInWeight: true },
						{ name: 'Fresh Baguette', categoryID: 'Bakery & Bread', priceInteger: 4, priceDecimal: 20 },
						{ name: 'Frozen Pizza', categoryID: 'Frozen', priceInteger: 26, priceDecimal: 50 },
						{ name: 'Bamba (Peanut & Corn Snack)', categoryID: 'Snacks & Candy', priceInteger: 4, priceDecimal: 0 },
						{ name: 'Coca Cola (1.5L)', categoryID: 'Beverage', priceInteger: 7, priceDecimal: 0 },
						{ name: 'Canned Olives', categoryID: 'Canned & Jarred', priceInteger: 4, priceDecimal: 75 },
						{ name: 'Scented Bleach', categoryID: 'Cleaners & Personal Hygiene', priceInteger: 12, priceDecimal: 60 },
						{ name: 'Toilet Paper', categoryID: 'Household Items', priceInteger: 25, priceDecimal: 20 },
				  ]);
			cities && admin && categories && products ? res() : rej();
		});
	} catch (e) {
		console.log(e.message);
	}
}

app.listen(1000, () => {
	console.log(`Running on :1000!
http://localhost:1000`);
});
