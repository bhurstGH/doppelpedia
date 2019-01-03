const wikiQueries = require("../db/queries.wikis");

module.exports = {
    index(req, res, next) {
        if (!req.user) {
            res.render("static/index");
        } else {
            let result = {};
            wikiQueries.newestWikis((err, wikis) => {
                result["newest"] = wikis;
                wikiQueries.recentUpdate((err, updated) => {
                    result["updated"] = updated;
                    res.render("static/index", {...result})
                })
            });
        }
    }
}