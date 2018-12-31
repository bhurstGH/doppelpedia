const wikiQueries = require("../db/queries.wikis");

module.exports = {
    public(req, res, next) {
        wikiQueries.getPublicWikis((err, wikis) => {
            if (err) {
                res.redirect(500, "static/index");
            } else {
                res.render("static/wikis", {wikis});
            }
        });
    },
    new(req, res, next) {
        res.render("wikis/new");
    },
    create(req, res, next) {
        let newWiki = {
            title: req.body.title,
            body: req.body.body,
            userId: req.user.id
        };
        wikiQueries.createWiki(newWiki, (err, wiki) => {
            if (err) {
                res.redirect(500, "/wikis/new");
            } else {
                res.redirect(303, `/wikis/${newWiki.id}`)
            }
        });
    },
    show(req, res, next) {
        wikiQueries.getWiki(req.params.id, (err, wiki) => {
            if (err || wiki == null) {
                res.redirect(404, "/");
            } else {
                res.render("wikis/show", {wiki})
            }
        });
    },
    destroy(req, res, next) {
        wikiQueries.deleteWiki(req.params.id, (err, deletedCount) => {
            if (err) {
                res.redirect(500, `/wikis/${req.params.id}`);
            } else {
                res.redirect(303, "/wikis");
            }
        });
    },
    edit(req, res, next) {
        wikiQueries.getWiki(req.params.id, (err, wiki) => {
            if (err || wiki == null) {
                res.redirect(404, "/");
            } else {
                res.render("wikis/edit", {wiki});
            }
        });
    },
    update(req, res, next) {
        wikiQueries.updateWiki(req.params.id, req.body, (err, wiki) => {
            if (err || wiki == null) {
                res.redirect(404, `/wikis/${req.params.id}/edit`)
            } else {
                res.redirect(`/wikis/${req.params.id}`);
            }
        });
    }
}