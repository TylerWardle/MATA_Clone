"use strict";
var CommentDbAccessor = require('../data_accessors/CommentDbAccessor');
var Comic = require('../models/Comic');
var CommentService = (function () {
    function CommentService(req, res) {
        this.req = req;
        this.res = res;
    }
    CommentService.prototype.insert = function (comment, authorID, comicID, callback) {
        var commentDAO = new CommentDbAccessor.CommentDbAccessor(this.req.mongoose);
        // retrieve authorUsername that corresponds with authorID
        var db = this.req.db;
        var registeredUsers = db.get('registeredUsers');
        registeredUsers.findOne({ _id: authorID }, function (err, user) {
            if (err)
                return console.error(err);
            var authorUsername = user.username;
            commentDAO.insert(comment, authorID, authorUsername, comicID, function (commentID) {
                callback(commentID);
            });
        });
    };
    CommentService.prototype.get = function (commentID, callback) {
        var commentDAO = new CommentDbAccessor.CommentDbAccessor(this.req.mongoose);
        commentDAO.get(commentID, function (comment) {
            callback(comment);
        });
    };
    CommentService.prototype.getAll = function (comicID, callback) {
        var commentDAO = new CommentDbAccessor.CommentDbAccessor(this.req.mongoose);
        commentDAO.getAll(comicID, function (comments) {
            callback(comments);
        });
    };
    CommentService.prototype.delete = function (commentID, userID, callback) {
        var commentDAO = new CommentDbAccessor.CommentDbAccessor(this.req.mongoose);
        var comicDAO = new Comic.Comic(this.req.mongoose);
        // get comment object to extract its authorID
        commentDAO.get(commentID, function (comment) {
            // get comic object to extract its comicID
            comicDAO.get(comment.comicID, function (comic) {
                if (userID == comic.authorID || userID == comment.authorID) {
                    commentDAO.delete(commentID, function () {
                        callback(true);
                    });
                }
                else {
                    callback(false);
                }
            });
        });
    };
    CommentService.prototype.deleteAll = function (comicID, userID, callback) {
        var commentDAO = new CommentDbAccessor.CommentDbAccessor(this.req.mongoose);
        var comicDAO = new Comic.Comic(this.req.mongoose);
        // get comic object to extract its comicID
        comicDAO.get(comicID, function (comic) {
            if (userID == comic.authorID) {
                commentDAO.deleteAll(comicID, function () {
                    callback(true);
                });
            }
            else {
                callback(false);
            }
        });
    };
    return CommentService;
}());
exports.CommentService = CommentService;
