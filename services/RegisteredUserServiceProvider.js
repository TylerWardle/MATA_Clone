///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>
var express = require('express');
var router = express.Router();
var RegisteredUserServiceProvider = (function () {
    function RegisteredUserServiceProvider() {
    }
    RegisteredUserServiceProvider.prototype.create = function (req, res) {
        return true;
    };
    return RegisteredUserServiceProvider;
})();
exports.RegisteredUserServiceProvider = RegisteredUserServiceProvider;
