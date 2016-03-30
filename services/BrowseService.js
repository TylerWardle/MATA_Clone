var Comic = require('../models/Comic');
var ComicCell = require('../models/ComicCell');
var BrowseService = (function () {
    function BrowseService(req, res) {
        this.req = req;
        this.res = res;
    }
    // get representative images for comics
    BrowseService.prototype.getRepresentativeImages = function (comicObjs, callback) {
        var comicCellDAO = new ComicCell.ComicCell(this.req.mongoose);
        comicCellDAO.getThumbnail(comicObjs, function (thumbnailArr) {
            callback(thumbnailArr);
        });
    };
    // get comics sorted alphabetically by title
    BrowseService.prototype.getComicsSortedByTitle = function (callback) {
        var comicDAO = new Comic.Comic(this.req.mongoose);
        comicDAO.getComicsSortedByTitle(function (comicObjs) {
            callback(comicObjs);
        });
    };
    // get comics sorted alphabetically by author
    BrowseService.prototype.getComicsSortedByAuthor = function (callback) {
        var comicDAO = new Comic.Comic(this.req.mongoose);
        comicDAO.getComicsSortedByAuthor(function (comicObjs) {
            callback(comicObjs);
        });
    };
    BrowseService.prototype.getLeastRecentlyPublishedComics = function (callback) {
        var comicDAO = new Comic.Comic(this.req.mongoose);
        comicDAO.getComicsSortedByLeastRecentlyPublished(function (comicObjs) {
            callback(comicObjs);
        });
    };
    BrowseService.prototype.getMostRecentlyPublishedComics = function (callback) {
        var comicDAO = new Comic.Comic(this.req.mongoose);
        comicDAO.getComicsSortedByMostRecentlyPublished(function (comicObjs) {
            callback(comicObjs);
        });
    };
    BrowseService.prototype.getZombieComics = function (callback) {
        var comicDAO = new Comic.Comic(this.req.mongoose);
        comicDAO.getZombiesComics(function (comicObjs) {
            callback(comicObjs);
        });
    };
    BrowseService.prototype.getPostApocalypticComics = function (callback) {
        var comicDAO = new Comic.Comic(this.req.mongoose);
        comicDAO.getPostApocalypticComics(function (comicObjs) {
            callback(comicObjs);
        });
    };
    BrowseService.prototype.getHumorComics = function (callback) {
        var comicDAO = new Comic.Comic(this.req.mongoose);
        comicDAO.getHumorComics(function (comicObjs) {
            callback(comicObjs);
        });
    };
    BrowseService.prototype.getSuperheroComics = function (callback) {
        var comicDAO = new Comic.Comic(this.req.mongoose);
        comicDAO.getSuperheroComics(function (comicObjs) {
            callback(comicObjs);
        });
    };
    BrowseService.prototype.getActionAdventureComics = function (callback) {
        var comicDAO = new Comic.Comic(this.req.mongoose);
        comicDAO.getActionAdventureComics(function (comicObjs) {
            callback(comicObjs);
        });
    };
    return BrowseService;
})();
exports.BrowseService = BrowseService;
/*
   // sends client a list of comicID links to published web comics and a list of its representative images
   router.get('/browse/title', function (req, res) { // sort by alphabetical order
       var c = new Comic.Comic(req.mongoose);
       var cc = new ComicCell.ComicCell(req.mongoose);

       c.getComicsSortedByTitle((comicObjs: any): void => {
           if (comicObjs.length == 0) {
               res.render('webcomic', { "webcomic": new Array<String>(), "cells": new Array<String>() });
               return;
           }
           c.extractPublishedComicIDs(comicObjs, (comicIDs): void => { // list of raw comicIDs without headers
               var imageHeader = req.headers['host'] + "/webcomic/image/";
               cc.getRepresentativeImages(comicIDs, imageHeader, (comicCellIDs): void => { // list of comicCellIDs with headers
                   var comicHeader = req.headers['host'] + "/webcomic/id/";
                   for (var i = 0; i < comicIDs.length; i++) { // append header to raw comicIDs in comicIDs list
                       comicIDs[i] = comicHeader + comicIDs[i];
                   }
                   res.render('webcomic', { "webcomic": comicIDs, "cells": comicCellIDs });
               });
           });
       });
   });
*/ 
