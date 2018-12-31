const Wiki = require("./models").Wiki;

module.exports = {
    getPublicWikis(callback) {
        return Wiki.findAll({
            where: { private: false }
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
        return Wiki.findByPk(id)
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
    }
}