///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
///<reference path='../types/DefinitelyTyped/mongodb/mongodb.d.ts'/>


var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;


/* GET  homepage. */
router.get('/', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.findOne({ _id: ObjectID("56b02064592721fa1ef24a3b")}, {_id:0, username: 1}, function(e, docs) {
        res.render('contributor', {
            "user": docs
        });
    });
});

module.exports = router;