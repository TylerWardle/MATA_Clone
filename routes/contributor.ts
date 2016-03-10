///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 

class contributor{
    
    constructor(){};
    
    startContributor(){
        var express = require('express');
        var router = express.Router();
        var ObjectID = require('mongodb').ObjectID;

        
        /* GET Contributors homepage. */
        router.get('/', function(req, res) {
        	var db = req.db;
            var contributors = db.get('contributors');
        	contributors.findOne({guid: ObjectID(req.cookies._id)}, function(error, contributor)
        	{
                if(contributor.comics != null){
        			var link = req.headers['host'] + "/webcomic/id/" + contributor.comics[0];
                }
        		res.render('contributor',{"contributor": contributor, "link": link});		
        	});
        });

    module.exports = router;
    }
    
}
var Contributor = new contributor();
Contributor.startContributor();