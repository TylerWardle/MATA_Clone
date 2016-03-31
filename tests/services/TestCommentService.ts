///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 

/*
These test suites for CommentService assumes an ordered testing sequence on an empty comment database.
i.e. the "test get method" uses the comment object stored in the database by the preceding "test insert method"
*/


import CommentService = require('../services/CommentService');

describe("Test Insert Comment", () =>{
  it("contains spec with an expectation", () => {
  	var cs = new CommentService.CommentService;
  	cs.insert("dummy comment", "dummy authorID", "dummy comicID", (commentID: any): any => {
  		expect(commentID).toBeDefined(); 
  	});
  });
});

describe("Test Get Comment", () =>{
  it("contains spec with an expectation", () => {
  	var cs = new CommentService.CommentService
  	var dummyCommentID = "123456789";
  	cs.get(dummyCommentID, (comment: any): any => {
        expect(comment.comment).toEqual("dummy comment");
        expect(comment.authorID).toEqual("dummy authorID");
        expect(comment.authorUsername).toBeDefined();
        expect(comment.comicID).toEqual("dummy comicID");
        expect(comment.publicationDate).toBeDefined();
  	});
  });
});

describe("Test Get All Comments", () =>{
  it("contains spec with an expectation", () => {
  	var cs = new CommentService.CommentService
  	var dummyComicID = "dummy ComicID";
  	cs.getAll(dummyComicID, (comments: any): any => {
        expect(comments.length).toEqual(1);

        expect(comments[0].comment).toEqual("dummy comment");
        expect(comments[0].authorID).toEqual("dummy authorID");
        expect(comments[0].authorUsername).toBeDefined();
        expect(comments[0].comicID).toEqual("dummy comicID");
        expect(comments[0].publicationDate).toBeDefined();
  	});
  });
});

describe("Test Delete Comments", () =>{
  it("contains spec with an expectation", () => {
  	var cs = new CommentService.CommentService
  	var commentID = "123456789";
  	var userID = "dummy userID";
  	cs.delete(commentID, "non existent userID", (isDeleted: boolean): any => {	// Test handler for a failed delete
  		expect(isDeleted).toBeFalsy();

  		cs.delete(commentID, "dummy userID", (isDeleted: boolean): any => {	// Test handler for a successful delete
  			expect(isDeleted).toBeTruthy());
  		});
  	});
  });
});

describe("Test Delete All Comments", () =>{
  it("contains spec with an expectation", () => {
  	var cs = new CommentService.CommentService
  	var commentID = "123456789";
  	var userID = "dummy userID";
  	cs.insert("dummy comment", "dummy authorID", "dummy comicID", (commentID: any): any => {
  		expect(commentID).toBeDefined(); 
  	});
  	cs.deleteAll(commentID, "non existent userID", (isDeleted: boolean): any => {	// Test handler for a failed delete
  		expect(isDeleted).toBeFalsy;

  		cs.deleteAll(commentID, "dummy userID", (isDeleted: boolean): any => {	// Test handler for a successful delete
  			expect(isDeleted).toBeTruthy;
  		});
  	});
  });
});