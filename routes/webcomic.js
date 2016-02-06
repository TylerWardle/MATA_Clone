///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
///<reference path='../types/DefinitelyTyped/mongodb/mongodb.d.ts'/>
var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
/* GET webcomic */
router.get('/', function (req, res) {
    var db = req.db;
    var collection = db.get('webcomiccollection');
    collection.findOne({ title: "new image t" }, function (e, docs) {
        res.render('webcomic', {
            "webcomic": docs
        });
    });
});
/* GET webcomic create page. */
router.get('/createNew', function (req, res) {
    res.render('createwebcomic', { title: 'Create Web Comic' });
});
/* POST webcomic to database. */
router.post('/submitNew', function (req, res) {
    //Set our internal DB variable
    var db = req.db;
    //Get our form values
    var title = req.body.title;
    var description = req.body.description;
    var genre = req.body.genre;
    var toPublish = req.body.toPublish;
    var firstImage = new Image();
    firstImage.src = req.body.firstImage;
    // Set collection
    var collection = db.get('webcomiccollection');
    collection.insert({
        "title": title,
        "description": description,
        "genre": genre,
        "toPublish": toPublish,
        "firstImage": firstImage
    }, function (err, doc) {
        if (err) {
            res.send("There was a problem adding the web comic");
        }
        else {
            //Redirect to the new webcomic
            res.redirect("./");
        }
    });
});
/* GET edit webcomic page. */
router.get('/edit', function (req, res) {
    res.render('createwebcomic', { title: 'Create Web Comic' });
});
/* PUT a Webcomic edit to t he d atabase. */
router.put('/edit', function (req, res) {
    var db = req.db;
    //Get edit form values
    var title = req.body.title;
    var description = req.body.description;
    var genre = req.body.genre;
    var toPublish = req.body.toPublish;
    var firstImage = req.body.firstImage;
    //Redirect to the edited webcomic
    res.render('webcomic', { title: 'Webcomic' });
});
module.exports = router;
