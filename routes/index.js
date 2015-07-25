var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var db = req.db;
    var collection = db.get('quotes');

    collection.find({},{},function(e,quotes){
        res.render('quotes', {
            "quotes" : quotes
        });
    });
});

router.get('/quotes/new', function(req, res) {
    res.render('new_quote', { title: 'Add New Quote' });
});

router.post('/quote/add', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var content = req.body.content;
    var author = req.body.author;

    // Set our collection
    var collection = db.get('quotes');

    // Submit to the DB
    collection.insert({
        "content" : content,
        "author" : author
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("/");
        }
    });
});

module.exports = router;
