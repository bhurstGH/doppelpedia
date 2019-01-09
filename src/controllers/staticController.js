const wikiQueries = require("../db/queries.wikis");

module.exports = {
    index(req, res, next) {
        if (!req.user) {
            res.render("static/index");
        } else {
            let result = {};
            wikiQueries.newestWikis((err, newest) => {
                result["newest"] = newest;
                wikiQueries.recentUpdate((err, updated) => {
                    result["updated"] = updated;
                    wikiQueries.getAllWikis((err, wikis) => {
                        result["wikis"] = wikis;
                        res.render("static/index", {...result})
                    })
                })
            });
        }
    }
}