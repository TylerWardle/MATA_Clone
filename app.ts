/// <reference path='types\DefinitelyTyped\node\node.d.ts'/>
/// <reference path='types\DefinitelyTyped\express\express.d.ts'/> 

interface Error {

    status?: number;

}

class Application {

    constructor() { }

    startApp() {

        var express = require('express');
        var path = require('path');
        var favicon = require('serve-favicon');
        var logger = require('morgan');
        var cookieParser = require('cookie-parser');
        var bodyParser = require('body-parser');

        // New Code
        var mongo = require('mongodb');
        var monk = require('monk');
        //var db = monk('127.0.0.1:27017/MATA');
        var db = monk('mongodb://heroku_21q1wxnl:otpu73q7n7h9o1ff9lvmbifs8q@ds047315.mongolab.com:47315/heroku_21q1wxnl');

        var routes = require('./routes/index');
        var users = require('./routes/users');

        var app = express();        

        // view engine setup
        app.set('view, path.join(__dirname, 'views'))        ;
		app.set('view engine', 'jade');        

        // uncomment af        ter placing your favicon in /publi        c
        //app.use(favic        on(path.join(__dirname, 'public', 'favicon.ico')))        ;
        app.use(logge  'dev'))        ;
        app.use(bodyPar        ser.json());
        app.use(bodyPar        ser.urlencoded({ extended: false }));
        app.use(cookieP        arser());
        app.use(expre.static(path.join(__dirname, 'public')));        

        // Make our db         accessible to our route        r
        app.use(functio        n(re q, re s, next)              req.db   db              next()        ;
    } p.use('/        ', ro        utes)        ;
    app.use('/users        ', users);        

    // catch 404 an        d forward to error handle        r
    app.use(functio        n(req, res, next)               var err = n   rror('Not Found')              err.status   4              next(err);
})                    
// error h        andle        rs        

// development         error handle        r
// will print s        tacktrac        e
if (app.get('en        v') === 'development') app.use(funct            n(err, req, res, next)                   res.statu  status || 500)                  res.rende  or', {
message: ssage                      error: er                    })          })    ; pro            ctio        n e        rror handle    r
// no stacktrac        es leaked to use    r
app.use(functio        n(err, req, res, next)           res.status(er            status || 500)      res.render('e            or', {
    message: er                ssage,
    error: {
    });


mod            e.ex        ports         = app;
}
}

var applic    ation = new Application();
application.startApp();
