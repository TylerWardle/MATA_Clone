///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
var express = require('express');
var router = express.Router();
var SearchBrowseService = (function () {
    function SearchBrowseService(database) {
        this.mongoose = database;
        this.schema = database.Schema;
        SearchBrowseService.comicModel = this.mongoose.model('Comic', this.schema);
        ;
    }
    SearchBrowseService.prototype.getComics = function (request, callback) {
        var searchField = request.match(/=\w*/g)[0].substring(1);
        var searchType = request.match(/=\w*/g)[1].substring(1);
        switch (searchType) {
            case "all":
                SearchBrowseService.comicModel.find({}, function (err, comics) {
                    if (err)
                        return err;
                    callback(comics);
                });
                break;
            case "genre":
                SearchBrowseService.comicModel.find({ 'genre': searchField }, function (err, comics) {
                    if (err)
                        return err;
                    callback(comics);
                });
                break;
            case "title":
                SearchBrowseService.comicModel.find({ 'title': searchField }, function (err, comics) {
                    if (err)
                        return err;
                    callback(comics);
                });
                break;
            case "description":
                SearchBrowseService.comicModel.find({ 'description': searchField }, function (err, comics) {
                    if (err)
                        return err;
                    callback(comics);
                });
                break;
            case "toPublish":
                SearchBrowseService.comicModel.find({ 'toPublish': true }, function (err, comics) {
                    if (err)
                        return err;
                    callback(comics);
                });
                break;
            default:
        }
    };
    SearchBrowseService.prototype.getAllComicsPublished = function (callback) {
        SearchBrowseService.comicModel.find({ 'toPublish': "true" }, function (err, comics) {
            if (err)
                return err;
            callback(comics);
        });
    };
    SearchBrowseService.prototype.getComicsPublishedByAuthor = function (authorUsername, callback) {
        SearchBrowseService.comicModel.find({ 'toPublish': true, 'authorUsername': authorUsername }, function (err, comics) {
            if (err)
                return err;
            callback(comics);
        });
    };
    SearchBrowseService.prototype.getAllComics = function (callback) {
        SearchBrowseService.comicModel.find({}, function (err, comics) {
            if (err)
                return err;
            callback(comics);
        });
    };
    SearchBrowseService.prototype.getAllComicsSortAuthor = function (callback) {
        SearchBrowseService.comicModel.aggregate([{ $sort: { normalized_authorUsername: 1 } }, { $match: { 'toPublish': true } }], function (err, comics) {
            callback(comics);
        });
    };
    SearchBrowseService.prototype.getAllComicsSortGenre = function (callback) {
        SearchBrowseService.comicModel.aggregate([{ $sort: { normalized_authorUsername: 1 } }, { $match: { 'toPublish': true } }], function (err, comics) {
            callback(comics);
        });
    };
    SearchBrowseService.comicModel = null;
    return SearchBrowseService;
})();
exports.SearchBrowseService = SearchBrowseService;
