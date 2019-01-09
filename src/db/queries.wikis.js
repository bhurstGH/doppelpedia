const Wiki = require("./models").Wiki;
const User = require("./models").User;

module.exports = {
    getPrivateWikis(req, callback) {
        return Wiki.findAll({
            where: {
                private: true,
                userId: req.user.id
            },
            include: [{
                model: User
            }]
        })
        .then((wikis) => {
            callback(null, wikis);
        })
        .catch((err) => {
            callback(err);
        })
    },
    getPublicWikis(callback) {
        return Wiki.findAll({
            where: {private: false},
            include: [{
                model: User
            }]
        })
        .then((wikis) => {
            callback(null, wikis);
        })
        .catch((err) => {
            callback(err);
        })
    },
    createWiki(newWiki, callback) {
        return Wiki.create(newWiki)
        .then((wiki) => {
            callback(null, wiki);
        })
        .catch((err) => {
            callback(err);
        })
    },
    getWiki(id, callback) {
        return Wiki.findByPk(id, {
            include: [{
                model: User
            }]
        })
        .then((wiki) => {
            callback(null, wiki);
        })
        .catch((err) => {
            callback(err);
        })
    },
    deleteWiki(id, callback) {
        return Wiki.destroy({
            where: { id }
        })
        .then((deletedCount) => {
            callback(null, deletedCount);
        })
        .catch((err) => {
            callback(err);
        })
    },
    updateWiki(id, updatedWiki, callback) {
        return Wiki.findByPk(id)
        .then((wiki) => {
            wiki.update(updatedWiki, {
                fields: Object.keys(updatedWiki)
            })
            .then(() => {
                callback(null, wiki);
            })
            .catch((err) => {
                callback(err);
            })
        })
    },
    newestWikis(callback) {
        return Wiki.scope({method: ["newest"]})
        .findAll({
            where: {private: false},
            include: [{
                model: User
            }]
        })
            .then((newest) => {
                callback(null, newest);
            })
            .catch((err) => {
                callback(err);
            })
    },
    recentUpdate(callback) {
        return Wiki.scope({method: ["updated"]})
        .findAll({
            where: {private: false},
            include: [{
                model: User
            }]
        })
        .then((updated) => {
            callback(null, updated);
        })
        .catch((err) => {
            callback(err);
        })
    }
}