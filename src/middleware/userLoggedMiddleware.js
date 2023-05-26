const userController = require('../controllers/main');
let db = require("../database/models");
const { where } = require('sequelize');

async function userLoggedMiddleware(req, res, next) {
	res.locals.isLogged = false;

	let emailInCookie = req.cookies.userEmail;
	if (emailInCookie) {
		let userFromCookie = await db.User.findOne({ where: { Email: emailInCookie } })
	
		if (userFromCookie) {
			req.session.userLogged = userFromCookie;
		}
	
	}
	if (req.session.userLogged) {
		res.locals.isLogged = true;
		res.locals.userLogged = req.session.userLogged;
	}	
	next();		
}



module.exports = userLoggedMiddleware;