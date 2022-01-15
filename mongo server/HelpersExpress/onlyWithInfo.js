const User = require('../Schemas/User');

module.exports = async (req, res, next) => {
	const user = await User.find({ _id: req.session.user?._id });
	if (!user?.address.city || !user?.address.street || !user?.address.name || !user?.address.last) {
		return res.status(400).send({err:true,msg:"Please complete your registration before shopping"})
	} else {
		next();
	}
};

// Currently not using. Edge case of user completing first step of register but loses connection
// Resolved by making register one route