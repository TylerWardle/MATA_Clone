export class CommentDbAccessor{
    mongoose: any;
    schema: any;
    commentSchema: any;
    static comment: any = null;

    constructor(mongoose: any) {
        this.mongoose = mongoose;
        this.schema = this.mongoose.Schema;
        
        this.commentSchema = new this.schema({ 
        	comment: String,
        	authorID: String,
        	comicID: String,
        });

        if (CommentDbAccessor.comment == null) { 
            CommentDbAccessor.comment = this.mongoose.model('Comment', this.commentSchema);
        }
    }

    insert(comment: string, authorID: string, comicID: string, callback: Function): any {
		var db = this.mongoose.connection;
        var commentDAO = new CommentDbAccessor.comment({
        	comment: comment,
        	authorID: authorID,
        	comicID: comicID
        });
        
        commentDAO.save(function (err, comment) {
            if (err)
                return console.error(err);
            callback(comment._id.toString());
        });
    }


	get(commentID: string, callback: Function): any {
		var db = this.mongoose.connection;
        var commentDAO = CommentDbAccessor.comment;

        commentDAO.findById({_id : commentID}, function (err, comment) {
            if (err)
                return console.error(err);
            callback(comment);
        });
	}

	getAll(comicID: string, callback: Function) : any {
        var db = this.mongoose.connection;
        var commentDAO = CommentDbAccessor.comment;

        commentDAO.find({comicID : comicID}, function (err, comments) {
            if (err)
                return console.error(err);
            callback(comments);
        });
	}

	delete(commentID: string, callback: Function): void {
        var db = this.mongoose.connection;
        var commentDAO = CommentDbAccessor.comment;

        commentDAO.remove({ _id: commentID }, function (err, comment) {
            if (err)
                return console.error(err);
            callback();
        });
    }

	deleteAll(comicID: string, callback: Function): void {
        var db = this.mongoose.connection;
        var commentDAO = CommentDbAccessor.comment;

        commentDAO.remove({ comicID: comicID}, function (err, comment) {
            if (err)
                return console.error(err);
            callback();
        });
    }
}



