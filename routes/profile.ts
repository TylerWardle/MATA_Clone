///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
//<reference path='../types/DefinitelyTyped/mongodb/mongodb-1.4.9.d.ts'/>
///<reference path='../types/DefinitelyTyped/mongodb/mongodb.d.ts'/>

import Comic = require('../models/Comic');
import ComicCell = require('../models/ComicCell');
import RegisteredUser = require('../models/RegisteredUser');
import Contributor = require('../models/Contributor');

var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var fs = require('fs');


/* GET  Profile settings. */
router.get('/', function(req, res) {
    var db = req.db;
    var registeredUsers = db.get('registeredUsers');
    var contributors = db.get("contributors");
    var comicID = req.params.id;

	
	 // Fetch the document
    registeredUsers.findOne({_id:ObjectID(req.cookies._id)}, function(err, user) {
		if(user)
		{
			if (user.accountType == "contributor") {
				var ObjectId = require('mongodb').ObjectID;
				contributors.findOne({ guid: ObjectID(user._id) }, function(error, contributor) {
					var comicIDLinks = new Array<String>();
					var i;
					if (contributor.comicIDs != null) {
						console.log(contributor.comicIDs.length);
						for (i = 0; i < contributor.comicIDs.length; i++) {
							comicIDLinks.push("http://" + req.headers['host'] + "/webcomic/id/" + contributor.comicIDs[i]);
						}
						res.render('profile', { "webcomic": comicIDLinks, "user": user, "contributor": contributor });
					}
					else{
						res.render('profile', { "user": user, "contributor": contributor });
					}
				});
			}
			else {
				res.render('profile', { "user": user });
			}
		}
		else {
			res.send("ACCESS DENIED");
		}
	});
});


/* Gets the edit profile page where the user can update their public profile.*/
router.get('/edit',function(req, res) {
    var db = req.db;
    var registeredUsers = db.get('registeredUsers');
    registeredUsers.findOne({_id:ObjectID(req.cookies._id)}, function(err, user) {
            res.render('editprofile', {"user":user});
    });
	
});


/* Updates users profile in the DB and redirect user to their newly updated profile*/
router.post('/edit',function(req, res) {
	var db = req.db;
    var registeredUsers = db.get('registeredUsers');

	// Fetch the document
    registeredUsers.findOne({_id:ObjectID(req.cookies._id)}, function(err, user) {
			
		if(user)
		{	
			if(req.file !== undefined)
			{
				fs.readFile(req.file.path, function (err, img) {
				var newPath = "./uploads/profilepictures/" + user.username;
						// write image file to uploads/fullsize folder
						fs.writeFile(newPath, img, function (err) {
							if (err)
								return console.error(err);
						});
				 });
				// the profile data (picture and about me section).
				registeredUsers.update({_id:req.cookies._id},
				   {
						$set:
						{
							"profilePicture": "http://"+req.headers['host'] + "/profile/profilepictures/" +user.username
						}
				   });
			}
			if (req.body.aboutMe !== undefined) 
			{
				console.log(req);
				// the profile data (picture and about me section).
				registeredUsers.update({_id:req.cookies._id},
				   {
						$set:
						{
							"aboutMe":req.body.aboutMe
						}
				   });
			}
			res.render('profile', { "user": user });
		}
		else
		{
			res.send("ACCESS DENIED");
		}
	});
});

	// get an image stored in profilepictures    
	router.get('/profilepictures/:username', function (req, res){
		var file = req.params.username;
		var img = fs.readFileSync("./uploads/profilepictures/" + file);
		res.writeHead(200, {'Content-Type': 'image/jpg' });
		res.end(img, 'binary');

	});

/* Update profile page settings. */
router.put('/edit', function(req,res)
{
    var db = req.db;
    var registeredUsers = db.get('registeredUsers');
	
    registeredUsers.findOne({_id:ObjectID(req.cookies._id)}, function(err, user) {
		if(user){
            registeredUsers.update({_id:ObjectID(req.cookies._id)},{
                            username: user.username,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            accountType: user.accountType,
                            password: req.body.password
						}); 
			if (user.accountType === "viewer") {
				var viewers = db.get('viewers');
				viewers.findOne({guid:ObjectID(req.cookies._id)}, function(err, viewer) {
					if (err) {
						res.send("ACCESS DENIED" + err);
					} else {
                        viewers.update({guid:ObjectID(req.cookies._id)},{
                            username: viewer.username,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            guid: viewer.guid
                        })
					}
				});
                res.redirect("viewer");
			} else {
				var contributors = db.get('contributors');
				contributors.findOne({guid:ObjectID(req.cookies._id)}, function(err, contributor) {
                    
					if (err) {
						res.send("ACCESS DENIED");
					} else {
                        contributors.update({guid:ObjectID(req.cookies._id)},{
                            username: contributor.username,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            guid: contributor.guid
                        })
					}
				});
				
                res.redirect("contributor");
			}
		}
		else
		{
			res.send("ACCESS DENIED");
		}
	}); 
});

module.exports = router;