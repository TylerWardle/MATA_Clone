///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 

var express = require('express');
var router = express.Router();

/* GET webcomic */
router.get('/', function(req,res)){
	res.render('webcomic', { title: 'webcomic' });
}

/* GET webcomic create page. */
router.get('/createNew', function(req, res) {
    res.render('createwebcomic', { title: 'Create Web Comic' });
});

/* POST webcomic to database. */
router.post('/submitNew', function(req, res) {
    //Set our internal DB variable
    var db = req.db;

    //Get our form values
    var title = req.body.title;
    var description = req.body.description;
    var genre = req.body.genre;
    var toPublish = req.body.toPublish;
    var firstImage = req.body.firstImage;

    //Redirect to the new webcomic
    res.render('webcomic',{title:'Webcomic'});

});

/* PUT a Webcomic edit to the database. */
router.put('/edit', function(req,res){
	var db = req.db;

	//Get edit form values
	var title = req.body.title;
    var description = req.body.description;
    var genre = req.body.genre;
    var toPublish = req.body.toPublish;
    var firstImage = req.body.firstImage;

	//Redirect to the edited webcomic
    res.render('webcomic',{title:'Webcomic'});

})

/* 

module.exports = router;