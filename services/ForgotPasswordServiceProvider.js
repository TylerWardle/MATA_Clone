///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>
"use strict";
var express = require('express');
var router = express.Router();
var ForgotPasswordServiceProvider = (function () {
    function ForgotPasswordServiceProvider() {
    }
    ForgotPasswordServiceProvider.prototype.create = function (req, res) {
        var db = req.db;
        return true;
    };
    ForgotPasswordServiceProvider.prototype.read = function (req, res) {
        return false;
    };
    ForgotPasswordServiceProvider.prototype.update = function (req, res) {
        return false;
    };
    ForgotPasswordServiceProvider.prototype.remove = function (req, res) {
        return false;
    };
    return ForgotPasswordServiceProvider;
}());
exports.ForgotPasswordServiceProvider = ForgotPasswordServiceProvider;
