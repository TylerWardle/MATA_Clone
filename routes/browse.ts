///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 

class Browse {
    constructor() {}

    startBrowse() {

  		var express = require('express');
  		var router = express.Router();
  		
  		router.get('/', function(req, res) {
  			res.render('browse');   
  		});

  		module.exports = router;    
    }       
}

var browse = new Browse();
browse.startBrowse();