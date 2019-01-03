const userQueries = require("../db/queries.users.js");
const passport = require("passport");
const confirmEmail = require("./emailController");

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
                    
                    confirmEmail(user.email, user.username);
                })
            }
        });
    },
    signInForm(req, res, next) {
        res.render("users/signin")
    },
    signIn(req, res, next) {
        passport.authenticate("local")
        (req, res, () => {
            if (!req.user) {
                req.flash("notice", "Sign in failed. Please try again.");
                res.redirect("users/signin");
            } else {
                req.flash("notice", `You've successfully signed in as ${req.user.username}`);
                res.redirect(`/users/${req.user.id}`);
            }
        })
    },
    signOut(req, res, next) {
        req.logout();
        req.flash("notice", "You've successfully signed out")
        res.redirect("/");
    },
    profile(req, res, next) {
        userQueries.getUser(req.params.id, (err, result) => {
            if (err || result.user === undefined) {
                req.flash("notice", "That user wasn't found.");
                res.redirect("/");
            } else {
                res.render("users/profile", {...result});
            }
        })
    }
}