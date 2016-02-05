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
    //var user = req.body.username;

    collection.findOne({username: "yup"}, function(e, docs) {
        res.render('accountsettings', {
            "user": docs
        });
    });
});

module.exports = router;