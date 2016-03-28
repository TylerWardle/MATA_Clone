import CommentDbAccessor = require('../data_accessors/CommentDbAccessor');

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

	getAll(comicID: string, callback: Function) : any {
		var commentDAO = new CommentDbAccessor.CommentDbAccessor(this.req.mongoose);
		commentDAO.getAll(comicID, (comments: any): any => {
			callback(comments);
		});
	}
}