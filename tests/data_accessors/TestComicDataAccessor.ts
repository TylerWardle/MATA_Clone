///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 

/*
These test suites for Comic Data Accessor assumes an ordered testing sequence on an empty comment database.
i.e. the "test get method" uses the comment object stored in the database by the preceding "test insert method"
*/

var title = "Dummy Title";
var normalized_title = "dummy title";
var authorID = "Dummy authorID";
var authorUsername = "Dummy authorUsername";
var normalized_authorUsername = "dummy authorusername";
var publicationDate = new Date();
var description = "dummy description";
var genre = "dummy genre";
var toPublish = true;
var openToContribution = true;
var openToCommenting = true;
var thumbnailID = "dummy thumbnailID";
var upvotes = 100;
var votedPpl = new Array<String, Number>;
var fave = new Array<String>;

import ComicDAO = require('../models/Comic');

describe("Test Insert Comic", () =>{
  it("contains spec with an expectation", () => {
  	var c = new ComicDAO.Comic;
    var dummyUpvotes = 100;
  	c.insert(title, authorID, authorUsername, description, genre, toPublish, openToContribution, openToCommenting, 
      thumbnailID, upvotes, votedPpl, fave, (comicID : any): any => {
        expect(comicID).toBeDefined;
    });
  });
});

describe("Test Get Comic", () =>{
  it("contains spec with an expectation", () => {
    var c = new ComicDAO.Comic;
    var comicID = "507f191e810c19729de4f370"
    c.get(comicID, (comic: any): any => {
      expect(comic.title).toEqual(title);
      expect(comic.normalized_title).toEqual(normalized_title);
      expect(comic.authorID).toEqual(authorID);
      expect(comic.authorUsername).toEqual(authorUsername);
      expect(comic.normalized_authorUsername).toEqual(normalized_authorUsername);
      expect(comic.publicationDate).toEqual(publicationDate);
      expect(comic.description).toEqual(description);
      expect(comic.genre).toEqual(genre);
      expect(comic.toPublish).toEqual(toPublish);
      expect(comic.openToContribution).toEqual(openToContribution);
      expect(comic.openToCommenting).toEqual(openToCommenting);
      expect(comic.thumbnailID).toEqual(thumbnailID);
      expect(comic.upvotes).toEqual(upvotes);
      expect(comic.votedPpl).toEqual(votedPpl);
      expect(comic.fave).toEqual(fave);
    });
  });
});

describe("Test GetAll Comic", () =>{
  it("contains spec with an expectation", () => {
    var c = new ComicDAO.Comic;
    var comicID = "507f191e810c19729de4f370"
    c.getAll(comicID, (comics: any): any => {
      expect(comics.title).toEqual(title);
      expect(comics.normalized_title).toEqual(normalized_title);
      expect(comics.authorID).toEqual(authorID);
      expect(comics.authorUsername).toEqual(authorUsername);
      expect(comics.normalized_authorUsername).toEqual(normalized_authorUsername);
      expect(comics.publicationDate).toEqual(publicationDate);
      expect(comics.description).toEqual(description);
      expect(comics.genre).toEqual(genre);
      expect(comics.toPublish).toEqual(toPublish);
      expect(comics.openToContribution).toEqual(openToContribution);
      expect(comics.openToCommenting).toEqual(openToCommenting);
      expect(comics.thumbnailID).toEqual(thumbnailID);
      expect(comics.upvotes).toEqual(upvotes);
      expect(comics.votedPpl).toEqual(votedPpl);
      expect(comics.fave).toEqual(fave);
    });
  });
});

describe("Test Update Comic", () =>{
  it("contains spec with an expectation", () => {
    var c = new ComicDAO.Comic;
    var comicID = "507f191e810c19729de4f370"
    c.update(title, authorID, authorUsername, description, genre, toPublish, openToContribution, openToCommenting, 
    thumbnailID, upvotes, votedPpl, fave, (comic : any): any => {
      expect(comic.title).toEqual(title);
      expect(comic.normalized_title).toEqual(normalized_title);
      expect(comic.authorID).toEqual(authorID);
      expect(comic.authorUsername).toEqual(authorUsername);
      expect(comic.normalized_authorUsername).toEqual(normalized_authorUsername);
      expect(comic.publicationDate).toEqual(publicationDate);
      expect(comic.description).toEqual(description);
      expect(comic.genre).toEqual(genre);
      expect(comic.toPublish).toEqual(toPublish);
      expect(comic.openToContribution).toEqual(openToContribution);
      expect(comic.openToCommenting).toEqual(openToCommenting);
      expect(comic.thumbnailID).toEqual(thumbnailID);
      expect(comic.upvotes).toEqual(upvotes);
      expect(comic.votedPpl).toEqual(votedPpl);
      expect(comic.fave).toEqual(fave);
    });
  });
});