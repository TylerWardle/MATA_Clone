var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>
var RegisteredUser = require('../models/RegisteredUser');
var Contributor = (function (_super) {
    __extends(Contributor, _super);
    function Contributor(username, password, firstName, lastName, accountType) {
        _super.call(this, username, password, firstName, lastName, accountType);
    }
    return Contributor;
})(RegisteredUser);
exports.Contributor = Contributor;
