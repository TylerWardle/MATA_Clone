///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>
var RegisteredUserDbAccessor = (function () {
    function RegisteredUserDbAccessor() {
    }
    RegisteredUserDbAccessor.prototype.retrieveRegisteredUser = function (req, res) {
        var db = req.db;
        var registeredUsers = db.get('registeredUsers');
        return true;
    };
    RegisteredUserDbAccessor.prototype.insertNewRegisteredUser = function (req, res, accountType) {
        return false;
    };
    RegisteredUserDbAccessor.prototype.update = function (req, res) {
        return false;
    };
    RegisteredUserDbAccessor.prototype.remove = function (req, res) {
        return false;
    };
    return RegisteredUserDbAccessor;
})();
exports.RegisteredUserDbAccessor = RegisteredUserDbAccessor;
