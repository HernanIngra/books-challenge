function adminMiddleware(req, res, next) {
	if (req.session.userLogged.CategoryId == 2) {
		return res.render('profile',{user:req.session.userLogged, msg:"You cannot edit nor delete books"});
	}
	next();
}

module.exports = adminMiddleware;