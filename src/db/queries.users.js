const User = require("./models").User;
const Wiki = require("./models").Wiki;
const bcrypt = require("bcryptjs");
const Authorizer = require("../policies/user");

module.exports = {
    createUser(newUser, callback) {
        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(newUser.password, salt);
        return User.create({
            username: newUser.username,
            email: newUser.email,
            password: hashedPassword
        })
        .then((user) => {
            callback(null, user);
        })
        .catch((err) => {
            callback(err);
        })
    },
    getUser(id, callback) {
        return User.findByPk(id)
        .then((user) => {
            if (!user) {
                callback(404);
            } else {
                Wiki.findAll({
                    where: { userId: user.id }
                })
                .then((wikis) => {
                    user.getCollabs({
                        through: "Collaborators"
                    })
                    .then((collabs) => {
                        callback(null, {user, wikis, collabs});
                    })
                    .catch((err) => {
                        callback(err);
                    })
                })
            }
        })
    },
    upgradeUser(req, callback) {
        return User.findByPk(req.user.id)
        .then((user) => {
            if (!user) {
                callback(404);
            } 

            const isPremium = new Authorizer(req.user, user)._isPremium();

            if (isPremium) {
                req.flash("notice", "You are already a premium user.");
                callback(null, user);
            } else {
                user.update(
                    {role: "premium"}
                )
                .then((res) => {
                    callback(null, res);
                })
                .catch((err) => {
                    callback(err);
                })
            }
        })
    },
    cancelPremium(req, callback) {
        return User.findByPk(req.user.id)
        .then((user) => {
            const isPremium = new Authorizer(req.user, user)._isPremium();

            if (isPremium) {
                user.update({
                    role: "standard"
                })
                .then((res) => {
                    Wiki.update({
                        private: false
                    },{
                        where: {
                            userId: user.id,
                            private: true
                        }
                    })
                    .then((res) => {
                        callback(null, res);
                    })
                    .catch((err) => {
                        callback(err);
                    })
                })
            } else {
                req.flash("notice", "You are not a premium user.");
                callback(null, user);
            }
        })
    },
    getUserByEmail(email, callback) {
        return User.findOne({
            where: {
                email: email
            }
        })
        .then((user) => {
            callback(null, user);
        })
        .catch((err) => {
            callback(err);
        })
    }
}