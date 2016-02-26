///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
/* GET  Profile settings. */
router.get('/', function (req, res) {
    var db = req.db;
    var registeredUsers = db.get('registeredUsers');
    // Fetch the document
    registeredUsers.findOne({ _id: ObjectID(req.cookies._id) }, function (err, user) {
        if (user) {
            //			if (user.accountType === "viewer") {
            //				var viewers = db.get('viewers');
            //				viewers.findOne({_id:req.headers['_id']}, function(err, viewers) {
            //					if (err) {
            //						res.send("ACCESS DENIED");
            //					}
            //					else
            //					{
            //						viewers.findOne({guid: req.headers['_id']}, function(error, viewer)
            //						{
            //							res.render('viewer', {"Viewer": viewer});
            //						});
            //					}
            //				});
            //			}
            //			else {
            //				var contributors = db.get('contributors');
            //				contributors.findOne({_id:req.headers['_id']}, function(err, contributor) {
            //					if (err) {
            //						res.send("ACCESS DENIED");
            //					}
            //					else
            //					{
            //						contributors.findOne({guid: req.headers['_id']}, function(error, contributor)
            //						{
            //							res.render('contributor', {"Contributor": contributor});
            //						});
            //					}
            //				});
            //			}	
            res.render('profile', { "user": user });
        }
        else {
            res.send("ACCESS DENIED");
        }
    });
});
router.get('/edit', function (req, res) {
    var db = req.db;
    var registeredUsers = db.get('registeredUsers');
    registeredUsers.findOne({ _id: ObjectID(req.cookies._id) }, function (err, user) {
        //res.render('profileEdit', {"user":user});
        res.send("Nothing here yet");
    });
});
module.exports = router;
