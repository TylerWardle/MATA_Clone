///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
var express = require('express');
var router = express.Router();
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
    var firstImage = req.body.firstImage;
});
module.exports = router;
