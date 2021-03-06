/// <reference path='types\DefinitelyTyped\node\node.d.ts'/>
/// <reference path='types\DefinitelyTyped\express\express.d.ts'/> 

interface Error {

    status?: number;

}

class Application {

    constructor() { }

    startApp() {
        var http = require('http');

        var express = require('express');
        var path = require('path');
        var favicon = require('serve-favicon');
        var logger = require('morgan');
        var cookieParser = require('cookie-parser');
        var bodyParser = require('body-parser');
        var multer = require('multer');
		//Retrive
        var mongo = require('mongodb');
        var monk = require('monk');
        //var db = monk('127.0.0.1:27017/MATA');
        var db = monk('mongodb://heroku_21q1wxnl:otpu73q7n7h9o1ff9lvmbifs8q@ds047315.mongolab.com:47315/heroku_21q1wxnl');
        var mongoose = require('mongoose'); // #al# : mongoose connection 
        //mongoose.connect('mongodb://localhost/MATA'); // #al# : mongoose connection
        mongoose.connect('mongodb://heroku_21q1wxnl:otpu73q7n7h9o1ff9lvmbifs8q@ds047315.mongolab.com:47315/heroku_21q1wxnl'); // #al# : mongoose connection 
        
        var easyimg = require('easyimage');
        var imagemagick = require('imagemagick');

        var routes = require('./routes');

        var app = express();   

        app.locals.moment = require('moment');     

        // view engine setup
        //app.set('views', path.join(__dirname, 'views'));
        app.set('views', path.join(__dirname, 'ViewsStyled'));
        app.set('view engine', 'jade');        

        // uncomment after placing your favicon in /public
        //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
        app.use(logger('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(cookieParser());
        app.use(express.static(path.join(__dirname, 'public')));  
        app.use(multer({dest:'./uploads/fullsize/'}).single('image'));  
		//app.use(multer({dest:'./uploads/profilepictures/'}).single('image')); 
        // Make our db accessible to our router
        app.use(function(req, res, next) {
            req.db = db;
            req.mongoose = mongoose;
            next();
        });
        app.use('/', routes);    

        // catch 404 and forward to error handler
        app.use(function(req, res, next) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        });
		
        // error handlers
        // development error handler
        // will print stacktrace
        if (app.get('env') === 'development') {
            app.use(function(err, req, res, next) {
                res.status(err.status || 500);
                res.render('error', {
                    message: err.message,
                    error: err
                });
            });
        }
		
        // production error handler
        // no stacktraces leaked to user
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: {}
            });
        });

        module.exports = app;
    }
}

var application = new Application();
application.startApp();