const userQueries = require("../db/queries.users.js");
const passport = require("passport");

module.exports = {
    signUp(req, res, next) {
        res.render("users/signup");
    },
    create(req, res, next) {
        let newUser = {
            username: req.body.name,
            email: req.body.email,
            password: req.body.password,
            password_conf: req.body.password_conf
        };
        userQueries.createUser(newUser, (err, user) => {
            if (err) {
                req.flash("error", err);
                res.redirect("/users/signup");
            } else {
                passport.authenticate("local")(req, res, () => {
                    req.flash("notice", "You've successfully signed in!");
                    res.redirect("/");
                })
            }
        });
    }
}