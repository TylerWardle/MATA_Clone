import CommentDbAccessor = require('../data_accessors/CommentDbAccessor');
import Comic = require('../models/Comic');

export class CommentService{

	req: any;
	res: any;

	constructor(req: any, res: any) {
		this.req = req;
		this.res = res;
	}

	insert(comment: string, authorID: string, comicID: string, callback: Function): any {
		var commentDAO = new CommentDbAccessor.CommentDbAccessor(this.req.mongoose);

		// retrieve authorUsername that corresponds with authorID
		var db = this.req.db;
        var registeredUsers = db.get('registeredUsers');
        registeredUsers.findOne({ _id: authorID }, function(err, user) {
        	if (err)
                return console.error(err);
			var authorUsername = user.username;
			commentDAO.insert(comment, authorID, authorUsername, comicID, (commentID: any): any => {
				callback(commentID);
			});
		});
	}

	get(commentID: string, callback: Function) : any {
		var commentDAO = new CommentDbAccessor.CommentDbAccessor(this.req.mongoose);
		commentDAO.get(commentID, (comment: any): any => {
			callback(comment);
		});
	}

	getAll(comicID: string, callback: Function) : any {
		var commentDAO = new CommentDbAccessor.CommentDbAccessor(this.req.mongoose);
		commentDAO.getAll(comicID, (comments: any): any => {
			callback(comments);
		});
	}

	delete(commentID: string, userID: string, callback: Function): any {
		var commentDAO = new CommentDbAccessor.CommentDbAccessor(this.req.mongoose);


        var comicDAO = new Comic.Comic(this.req.mongoose);

        // get comment object to extract its authorID
        commentDAO.get(commentID, (comment): any => {
        	// get comic object to extract its comicID
        	comicDAO.get(comment.comicID, (comic): any => {
        		if (userID == comic.authorID || userID == comment.authorID) { //allow deletion if the invoker is either the author of the comment or the owner of the comic
        			commentDAO.delete(commentID, (): any => {
        				callback(true);
        			});
        		} else {
        			callback(false);
        		} 
        	});
        });
	}

	deleteAll(comicID: string, userID: string, callback: Function): any {
		var commentDAO = new CommentDbAccessor.CommentDbAccessor(this.req.mongoose);


        var comicDAO = new Comic.Comic(this.req.mongoose);

        // get comic object to extract its comicID
        comicDAO.get(comicID, (comic): any => {
        	if (userID == comic.authorID) {	//allow deletion if the invoker is the owner of the comic
        		commentDAO.deleteAll(comicID, (): any => {
        			callback(true);
        		});
        	} else {
        		callback(false);
        	} 
        });
	}
}