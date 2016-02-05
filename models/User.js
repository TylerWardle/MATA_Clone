///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>
var User = (function () {
    function User(username, firstName, lastName, accountType) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.accountType = accountType;
    }
    User.prototype.getUsername = function () {
        return this.username;
    };
    User.prototype.getFirstName = function () {
        return this.firstName;
    };
    User.prototype.getLastName = function () {
        return this.lastName;
    };
    User.prototype.getAccountType = function () {
        return this.accountType;
    };
    User.prototype.getUserId = function () {
        return this.userId;
    };
    return User;
})();
exports.User = User;
