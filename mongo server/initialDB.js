const { connect } = require('mongoose');
const { User, ShoppingCart, Category, Product, Order, City } = require('./Schemas/AllSchemas');

(async () => await connect('mongodb://localhost/ronShopDB'))();

module.exports = async () => {
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
			const userCount = await User.find({ role: 'user' }).countDocuments();
			admin =
				adminCount && userCount
					? true
					: await User.insertMany([
							{
								_id: 305360943,
								name: { first: 'admin', last: 'admin' },
								email: 'ad@mi.nn',
								address: { city: 'Jerusalem', street: "Ha'nevi'im 14" },
								password: 'admin',
								role: 'admin',
							},
							{
								_id: 00012369,
								name: { first: 'user', last: 'user' },
								email: 'us@er.rr',
								address: { city: 'Jerusalem', street: "Ha'nevi'im 14" },
								password: 'user',
							},
					  ]);
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
						{ _id: 'Questionable' },
				  ]);
			const productsCount = await Product.find({}).countDocuments();
			products = productsCount
				? true
				: await Product.insertMany([
						{ name: 'Milk', categoryID: 'Dairy & Eggs', priceInteger: 8, priceDecimal: 90, imageURL: 'assets/Milk.jpeg' },
						{ name: 'Eggs (12)', categoryID: 'Dairy & Eggs', priceInteger: 12, priceDecimal: 60, imageURL: 'assets/Eggs.jpg' },
						{
							name: 'Tomatoes',
							categoryID: 'Fresh Produce',
							priceInteger: 2,
							priceDecimal: 0,
							isInWeight: true,
							imageURL: 'assets/Tomato.jpg',
						},
						{
							name: 'Cucumber',
							categoryID: 'Fresh Produce',
							priceInteger: 2,
							priceDecimal: 0,
							isInWeight: true,
							imageURL: 'assets/Cucumber.jpg',
						},
						{ name: 'Fresh Rabbit', categoryID: 'Meat & Fish', priceInteger: 59, priceDecimal: 90, isInWeight: true },
						{
							name: 'Fresh Chicken Breast',
							categoryID: 'Meat & Fish',
							priceInteger: 24,
							priceDecimal: 90,
							imageURL: 'assets/Chicken Breast.png',
						},
						{ name: 'Fresh Baguette', categoryID: 'Bakery & Bread', priceInteger: 4, priceDecimal: 20, imageURL: 'assets/Baguette.jpg' },
						{ name: 'Fresh Ciabatta', categoryID: 'Bakery & Bread', priceInteger: 7, priceDecimal: 20, imageURL: 'assets/Ciabatta.jpg' },
						{ name: 'Bagel Bites', categoryID: 'Frozen', priceInteger: 9, priceDecimal: 50, imageURL: 'assets/Bagel Bites.jpg' },
						{
							name: 'Chips',
							categoryID: 'Snacks & Candy',
							priceInteger: 3,
							priceDecimal: 0,
							imageURL: 'assets/Chips.jpg',
						},
						{ name: 'Pepsi (1.5L)', categoryID: 'Beverages', priceInteger: 7, priceDecimal: 0, imageURL: 'assets/Pepsi.jpg' },
						{ name: 'Generic brand beer', categoryID: 'Beverages', priceInteger: 3, priceDecimal: 0, imageURL: 'assets/Beer.jpg' },
						{ name: 'Champagne', categoryID: 'Beverages', priceInteger: 86, priceDecimal: 0, imageURL: 'assets/Champagne.jpg' },
						{ name: 'Mystery Drink', categoryID: 'Beverages', priceInteger: 1, priceDecimal: 0, imageURL: 'assets/Mystery Drink.jpg' },
						{ name: 'Canned Tuna', categoryID: 'Canned & Jarred', priceInteger: 4, priceDecimal: 75, imageURL: 'assets/Tuna.jpg' },
						{ name: 'Scented Bleach', categoryID: 'Cleaners & Personal Hygiene', priceInteger: 12, priceDecimal: 60 },
						{
							name: 'Laundry Detergent',
							categoryID: 'Cleaners & Personal Hygiene',
							priceInteger: 12,
							priceDecimal: 60,
							imageURL: 'assets/Laundry Detergent.jpg',
						},
						{ name: 'Toilet Paper', categoryID: 'Household Items', priceInteger: 15, priceDecimal: 20, imageURL: 'assets/Toilet Paper.jpg' },
						{ name: 'Paper Cups (30)', categoryID: 'Household Items', priceInteger: 8, priceDecimal: 20, imageURL: 'assets/Paper Cup.jpg' },
						{ name: 'Random Pills', categoryID: 'Questionable', priceInteger: 58, priceDecimal: 20, imageURL: 'assets/Pills.jpg' },
						{
							name: 'Perfectly Harmless Package',
							categoryID: 'Questionable',
							priceInteger: 256,
							priceDecimal: 42,
							imageURL: 'assets/Cocaine.jpg',
							isInWeight: true,
						},
				  ]);
			cities && admin && categories && products ? res() : rej();
		});
	} catch (e) {
		console.log(e.message);
	}
};
