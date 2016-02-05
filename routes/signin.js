var express = require('express');
var router = express.Router();
/* POST to sign into the system. */
router.post('/', function (req, res) {
    // Set our internal DB variable
    var db = req.db;
    // Get our form values. These rely on the "name" attributes
    var username = req.body.username;
    // Set our collection
    var collection = db.get('registerUsers');
    var findUser = collection.find({ username: req.body.username });
    //collection.find({$where: function(){this.username === username}});
    res.render('homepage', { title: 'Welcome back!' });
});
/* GET register page. */
router.get('/', function (req, res) {
    res.render('signin', { title: 'Sign In!' });
});
module.exports = router;
