///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>
// This class represents a registered user in the system. 
// This class is used to verify a user before granting them
// access to the system.
var RegisteredUser = (function () {
    function RegisteredUser(username, password, firstName, lastName, accountType /*,Question: string, sAnswer:string*/) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.accountType = accountType;
        this.guid = Guid.newGuid();
        this.favorites = new Array();
        //this.secretQuestion = sQuestion;
        //this.secretAnswer = secretAnswer;
    }
    RegisteredUser.prototype.getUsername = function () {
        return this.username;
    };
    RegisteredUser.prototype.getPassword = function () {
        return this.password;
    };
    RegisteredUser.prototype.getFirstName = function () {
        return this.firstName;
    };
    RegisteredUser.prototype.getLastName = function () {
        return this.lastName;
    };
    RegisteredUser.prototype.getAccountType = function () {
        return this.accountType;
    };
    RegisteredUser.prototype.getGuid = function () {
        return this.guid;
    };
    RegisteredUser.prototype.getSecretQuestion = function () {
        return this.secretQuestion;
    };
    RegisteredUser.prototype.getSecretAnswer = function () {
        return this.secretAnswer;
    };
    RegisteredUser.prototype.getFavorites = function () {
        return this.favorites;
    };
    RegisteredUser.prototype.addFavorite = function (favorite) {
        this.favorites.push(favorite);
    };
    return RegisteredUser;
})();
exports.RegisteredUser = RegisteredUser;
var Guid = (function () {
    function Guid() {
    }
    Guid.newGuid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    return Guid;
})();
