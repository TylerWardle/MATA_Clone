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
		commentDAO.insert(comment, authorID, comicID, (commentID: any): any => {
			callback(commentID);
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
        		if (comment.authorID == comic.authorID || comment.authorID == userID) {
        			//allow deletion if the invoker is either the author of the comment or the owner of the comic
        			commentDAO.delete(commentID, (): any => {
        				callback(true);
        			});
        		} else {
        			callback(false);
        		} 
        	});
        });
	}
}