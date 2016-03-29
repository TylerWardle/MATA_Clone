 ///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 

import CommentService = require('../services/CommentService');

class Comment {
	
    constructor() { }

    startComment() {
		var express = require('express');
		var router = express.Router();
		
		// post a new comment
		router.post('/:id', function (req, res) {
			var commentService = new CommentService.CommentService(req, res);
			var comment = req.body.comment;
			var authorID = req.cookies._id;
			var comicID = req.params.id;

			commentService.insert(comment, authorID, comicID, (commentID: string): void => {
				var header = req.headers['host'];
				res.redirect("http://"+header+"/webcomic/id/"+comicID);
			});
		});

		// delete a comment
		router.post('/delete/:id', function (req, res) {
			console.log("*******************************MMMMMMMMEEEEEE!!!");
			var commentService = new CommentService.CommentService(req, res);
			var commentID = req.params.id;
			var userID = req.cookies._id;
			commentService.delete(commentID, userID, (isDeleted: boolean): void => {
				console.log("*******************************MMMMMMMMEEEEEE!!!");
				var header = req.headers['host'];
				res.redirect("http://"+header+"/webcomic/id/"+req.body.comicID);
			});
		});
/*
		// get comments
		router.get('/', function (req, res) {
			var commentService = CommentService.CommentService(req, res);
			var comicID = req.body.comicID;

			commentService.getAll(comicID, (comment: any) : void => {
				res.render('comment', { "comment": comment });
			});
		});

			getAll(comicID: string, callback: Function) : any {
		var commentDAO = new CommentDbAccessor.CommentDbAccessor(this.req.mongoose);
		commentDAO.getAll(comicID, (comments: any): any => {
			callback(comments);
		});
	}

		})	get(commentID: string, callback: Function) : any {
		var commentDAO = new CommentDbAccessor.CommentDbAccessor(this.req.mongoose);
		commentDAO.get(commentID, (comment: any): any => {
			callback(comment);
		});
	}

	insert(comment: string, authorID: string, comicID: string, callback: Function): any {
			var username = req.cookies.username;
			var message = req.body.chatMessage;
            res.json(message);
			chatService.addIncomingMessageToChatMessages(message, username);
		});

		router.get('/history', function (req, res) {
			var history = chatService.getChatMessages();
			res.json(history);
		});
		*/

		module.exports = router;
	}
}


var comment = new Comment();
comment.startComment();