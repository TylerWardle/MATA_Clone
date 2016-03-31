///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
var CommentService = require('../services/CommentService');
var Comment = (function () {
    function Comment() {
    }
    Comment.prototype.startComment = function () {
        var express = require('express');
        var router = express.Router();
        // post a new comment
        router.post('/:id', function (req, res) {
            var commentService = new CommentService.CommentService(req, res);
            var comment = req.body.comment;
            var authorID = req.cookies._id;
            var comicID = req.params.id;
            commentService.insert(comment, authorID, comicID, function (commentID) {
                var header = req.headers['host'];
                res.redirect("http://" + header + "/webcomic/id/" + comicID);
            });
        });
        // delete a comment
        router.post('/delete/:comicID/:commentID', function (req, res) {
            var commentService = new CommentService.CommentService(req, res);
            var commentID = req.params.commentID;
            var userID = req.cookies._id;
            commentService.delete(commentID, userID, function (isDeleted) {
                var header = req.headers['host'];
                res.redirect("http://" + header + "/webcomic/id/" + req.params.comicID);
            });
        });
        // delete all comments
        router.post('/delete/:comicID/', function (req, res) {
            var commentService = new CommentService.CommentService(req, res);
            var userID = req.cookies._id;
            var comicID = req.params.comicID;
            commentService.deleteAll(comicID, userID, function (isDeleted) {
                var header = req.headers['host'];
                res.redirect("http://" + header + "/webcomic/id/" + comicID);
            });
        });
        module.exports = router;
    };
    return Comment;
})();
var comment = new Comment();
comment.startComment();
