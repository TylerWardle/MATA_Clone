///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
var express = require('express');
var router = express.Router();
/* GET webcomic craeate page. */
router.get('/', function (req, res) {
    res.render('createwebcomic', { title: 'Create Web Comic' });
});
module.exports = router;
