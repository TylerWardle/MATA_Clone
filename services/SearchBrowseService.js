///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
var express = require('express');
var router = express.Router();
var SearchBrowseService = (function () {
    function SearchBrowseService(database) {
        this.mongoose = database;
        this.schema = database.Schema;
        SearchBrowseService.comicModel = this.mongoose.model('Comic', this.schema);
        SearchBrowseService.cellModel = this.mongoose.model('ComicCell', this.schema);
    }
    SearchBrowseService.prototype.getComicsForViewer = function (request, callback) {
        SearchBrowseService.comicModel.find({ 'toPublish': true }, function (err, comics) {
            if (err)
                return err;
            callback(comics);
        });
    };
    SearchBrowseService.prototype.getComics = function (request, callback) {
        var searchField = "";
        var searchType = "";
        var userName = request.cookies.userName;
        if (request.url.match(/=\w*/g) != null) {
            searchField = request.url.match(/=\w*/g)[0].substring(1);
            searchType = request.url.match(/=\w*/g)[1].substring(1);
        }
        switch (searchType) {
            case "all":
                SearchBrowseService.comicModel.find({}, function (err, comics) {
                    if (err)
                        return err;
                    callback(comics);
                });
                break;
            case "genre":
                SearchBrowseService.comicModel.find({ $or: [
                        { $and: [{ 'genre': searchField.toLowerCase() }, { 'toPublish': true }] },
                        { $and: [{ 'genre': searchField.toLowerCase() }, { 'authorUsername': userName }] }
                    ] }, function (err, comics) {
                    if (err)
                        return err;
                    callback(comics);
                });
                break;
            case "title":
                SearchBrowseService.comicModel.find({ $or: [
                        { $and: [{ 'normalized_title': searchField.toLowerCase() }, { 'toPublish': true }] },
                        { $and: [{ 'normalized_title': searchField.toLowerCase() }, { 'authorUsername': userName }] }
                    ] }, function (err, comics) {
                    if (err)
                        return err;
                    callback(comics);
                });
                break;
            case "description":
                SearchBrowseService.comicModel.find({ $or: [
                        { $and: [{ 'description': searchField }, { 'toPublish': true }] },
                        { $and: [{ 'description': searchField }, { 'authorUsername': userName }] }
                    ] }, function (err, comics) {
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
            case "author":
                SearchBrowseService.comicModel.find({ $or: [
                        { $and: [{ 'normalized_authorUsername': searchField.toLowerCase() }, { 'toPublish': true }] },
                        { $and: [{ 'normalized_authorUsername': searchField.toLowerCase() }, { 'authorUsername': userName }] }
                    ] }, function (err, comics) {
                    if (err)
                        return err;
                    callback(comics);
                });
                break;
            default:
                SearchBrowseService.comicModel.find({ 'authorUsername': userName }, function (err, comics) {
                    if (err)
                        return err;
                    callback(comics);
                });
                break;
        }
    };
    SearchBrowseService.comicModel = null;
    SearchBrowseService.cellModel = null;
    return SearchBrowseService;
})();
exports.SearchBrowseService = SearchBrowseService;
