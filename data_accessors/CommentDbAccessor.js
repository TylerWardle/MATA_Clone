"use strict";
var CommentDbAccessor = (function () {
    function CommentDbAccessor(mongoose) {
        this.mongoose = mongoose;
        this.schema = this.mongoose.Schema;
        this.commentSchema = new this.schema({
            comment: String,
            authorID: String,
            authorUsername: String,
            comicID: String,
            publicationDate: { type: Date, default: Date.now }
        });
        if (CommentDbAccessor.comment == null) {
            CommentDbAccessor.comment = this.mongoose.model('Comment', this.commentSchema);
        }
    }
    CommentDbAccessor.prototype.insert = function (comment, authorID, authorUsername, comicID, callback) {
        var db = this.mongoose.connection;
        var commentDAO = new CommentDbAccessor.comment({
            comment: comment,
            authorID: authorID,
            authorUsername: authorUsername,
            comicID: comicID,
            publicationDate: new Date()
        });
        commentDAO.save(function (err, comment) {
            if (err)
                return console.error(err);
            callback(comment._id.toString());
        });
    };
    CommentDbAccessor.prototype.get = function (commentID, callback) {
        var db = this.mongoose.connection;
        var commentDAO = CommentDbAccessor.comment;
        commentDAO.findById({ _id: commentID }, function (err, comment) {
            if (err)
                return console.error(err);
            callback(comment);
        });
    };
    CommentDbAccessor.prototype.getAll = function (comicID, callback) {
        var db = this.mongoose.connection;
        var commentDAO = CommentDbAccessor.comment;
        commentDAO.find({ comicID: comicID }, function (err, comments) {
            if (err)
                return console.error(err);
            callback(comments);
        });
    };
    CommentDbAccessor.prototype.delete = function (commentID, callback) {
        var db = this.mongoose.connection;
        var commentDAO = CommentDbAccessor.comment;
        commentDAO.remove({ _id: commentID }, function (err, comment) {
            if (err)
                return console.error(err);
            callback();
        });
    };
    CommentDbAccessor.prototype.deleteAll = function (comicID, callback) {
        var db = this.mongoose.connection;
        var commentDAO = CommentDbAccessor.comment;
        commentDAO.remove({ comicID: comicID }, function (err, comment) {
            if (err)
                return console.error(err);
            callback();
        });
    };
    CommentDbAccessor.comment = null;
    return CommentDbAccessor;
}());
exports.CommentDbAccessor = CommentDbAccessor;
