const wikiQueries = require("../db/queries.wikis");

module.exports = {
    public(req, res, next) {
        wikiQueries.getPublicWikis((err, wikis) => {
            if (err) {
                res.redirect(500, "/");
            } else {
                res.render("/", {wikis});
            }
        });
    },
    new(req, res, next) {
        res.render("wikis/new");
    },
    create(req, res, next) {
        let private;
        if (req.body.private) {
            private = true;
        } else {
            private = false;
        }
        let newWiki = {
            title: req.body.title,
            body: req.body.body,
            private: private,
            userId: req.user.id
        };
        wikiQueries.createWiki(newWiki, (err, wiki) => {
            if (err) {
                res.redirect(500, "/wikis/new");
            } else {
                res.redirect(303, `/wikis/${wiki.id}`)
            }
        });
    },
    show(req, res, next) {
        wikiQueries.getWiki(req.params.id, (err, wiki) => {
            if (err || wiki == null) {
                res.redirect(404, "/");
            } else {
                res.render("wikis/wiki", {wiki})
            }
        });
    },
    destroy(req, res, next) {
        wikiQueries.deleteWiki(req.params.id, (err, deletedCount) => {
            if (err) {
                res.redirect(500, `/wikis/${req.params.id}`);
            } else {
                res.redirect(303, "/");
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
        let private;
        if (req.body.private) {
            private = true;
        } else {
            private = false;
        }
        let updatedWiki = {
            title: req.body.title,
            body: req.body.body,
            private: private,
        };
        wikiQueries.updateWiki(req, updatedWiki, (err, wiki) => {
            if (err || wiki == null) {
                res.redirect(404, `/wikis/${req.params.id}/edit`)
            } else {
                res.redirect(`/wikis/${req.params.id}`);
            }
        });
    }
}