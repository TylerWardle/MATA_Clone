var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>
var RegisteredUser_1 = require('./RegisteredUser');
var Viewer = (function (_super) {
    __extends(Viewer, _super);
    function Viewer(username, password, firstName, lastName, accountType) {
        _super.call(this, username, password, firstName, lastName, accountType);
    }
    return Viewer;
})(RegisteredUser_1.RegisteredUser);
