///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>
var User = (function () {
    function User(name, password) {
        this.name = name;
        this.password = password;
        this.favorites = new Array();
    }
    User.prototype.getName = function () {
        return this.name;
    };
    User.prototype.getPassword = function () {
        return this.password;
    };
    User.prototype.getFavorites = function () {
        return this.favorites;
    };
    User.prototype.addFavorite = function (favorite) {
        this.favorites.push(favorite);
    };
    return User;
})();
exports.User = User;
