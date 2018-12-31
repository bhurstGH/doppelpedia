module.exports = {
    index(req, res, next) {
        if (!req.user) {
            res.render("static/index");
        } else {
            res.redirect(`users/${req.user.id}`);
        }
    }
}