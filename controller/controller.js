const express = require('express');
const router = express.Router();
const path = require('path');

const request = require('request');
const cheerio = require('cheerio');

const Comment = require('../models/Comment');
const Article = require('../models/Article');

router.get("/", function(req, res) {
    res.redirect("/articles");
});

router.get("/scrape", function(req, res) {
    request("http://www.npr.org", function(error, response, html) {
        let $ = cheerio.load(html);
        let titlesArray = [];

        $("title").each(function(i, element) {
            let result{};

            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");

            if (result.title !== "" && result.link !== "") {
                if (titlesArray.indexOf(result.title) == -1) {
                    titlesArray.push(result.title);
                    Article.count({ title: result.title }, function(err, test) {
                        if (test === 0) {
                            let entry = new Article(result);

                            entry.save(function (err, doc) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log(doc);
                                }
                            })
                        }
                    })

                } else {
                    console.log("Article already exists");
                }

            } else {
                console.log("Not saved to DB, missing data");
                }
        });
        res.redirect("/");
    });
});

router.get('/articles', function (req, res) {
    Article.find().sort({ _id: -1 }).exec(function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            let artc1 = { article: doc };
    res.render("index", artc1);
}
    });
});

router.get("/articles-json", function (req, res) {
    Article.find({}, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            res.json(doc);
        }
    });
});

module.exports = router;

