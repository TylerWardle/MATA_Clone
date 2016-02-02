/// <reference path='types\DefinitelyTyped\node\node.d.ts'/>
/// <reference path='types\DefinitelyTyped\express\express.d.ts'/> 
var Application = (function () {
    function Application() {
    }
    Application.prototype.startApp = function () {
        var express = require('express');
        var path = require('path');
        var favicon = require('serve-favicon');
        var logger = require('morgan');
        var cookieParser = require('cookie-parser');
        var bodyParser = require('body-parser');
        // New Code
        var mongo = require('mongodb');
        var monk = require('monk');
        var db = monk('127.0.0.1:27017/MATA');
        //var db = monk('mongodb://heroku_21q1wxnl:otpu73q7n7h9o1ff9lvmbifs8q@ds047315.mongolab.com:47315/heroku_21q1wxnl');
        var routes = require('./routes/index');
        //var signup = require('./routes/signup');
        //var users = require('./routes/users');
        var app = express();
        // view engine setup
        app.set('views', path.join(__dirname, 'views'));
        app.set('view engine', 'jade');
        // uncomment after placing your favicon in /public
        //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
        app.use(logger('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(cookieParser());
        app.use(express.static(path.join(__dirname, 'public')));
        // Make our db accessible to our router
        app.use(function (req, res, next) {
            req.db = db;
            next();
        });
        app.use('/', routes);
        //app.use('/users', users);
        //app.use('/signup',signup);       
        // catch 404 and forward to error handler
        app.use(function (req, res, next) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        });
        // error handlers
        // development error handler
        // will print stacktrace
        if (app.get('env') === 'development') {
            app.use(function (err, req, res, next) {
                res.status(err.status || 500);
                res.render('error', {
                    message: err.message,
                    error: err
                });
            });
        }
        // production error handler
        // no stacktraces leaked to user
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: {}
            });
        });
        module.exports = app;
    };
    return Application;
})();
var application = new Application();
application.startApp();
