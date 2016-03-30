///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 
var BrowseService = require('../services/BrowseService');
var Browse = (function () {
    function Browse() {
    }
    Browse.prototype.startBrowse = function () {
        var express = require('express');
        var router = express.Router();
        router.get('/', function (req, res) {
            var browseService = new BrowseService.BrowseService(req, res);
            browseService.getComicsSortedByTitle(function (comicObjs) {
                browseService.getRepresentativeImages(comicObjs, function (thumbnailArr) {
                    res.render('browseResults', { "Comics": comicObjs, "header": req.headers['host'] + "/webcomic/", "ComicCells": thumbnailArr });
                });
            });
        });
        router.get('/byTitle', function (req, res) {
            var browseService = new BrowseService.BrowseService(req, res);
            browseService.getComicsSortedByTitle(function (comicObjs) {
                browseService.getRepresentativeImages(comicObjs, function (thumbnailArr) {
                    res.render('browseResults', { "Comics": comicObjs, "header": req.headers['host'] + "/webcomic/", "ComicCells": thumbnailArr });
                });
            });
        });
        router.get('/byAuthor', function (req, res) {
            var browseService = new BrowseService.BrowseService(req, res);
            browseService.getComicsSortedByAuthor(function (comicObjs) {
                browseService.getRepresentativeImages(comicObjs, function (thumbnailArr) {
                    res.render('browseResults', { "Comics": comicObjs, "header": req.headers['host'] + "/webcomic/", "ComicCells": thumbnailArr });
                });
            });
        });
        router.get('/byPublicationDate/Oldest', function (req, res) {
            var browseService = new BrowseService.BrowseService(req, res);
            browseService.getLeastRecentlyPublishedComics(function (comicObjs) {
                browseService.getRepresentativeImages(comicObjs, function (thumbnailArr) {
                    res.render('browseResults', { "Comics": comicObjs, "header": req.headers['host'] + "/webcomic/", "ComicCells": thumbnailArr });
                });
            });
        });
        router.get('/byPublicationDate/Newest', function (req, res) {
            var browseService = new BrowseService.BrowseService(req, res);
            browseService.getMostRecentlyPublishedComics(function (comicObjs) {
                browseService.getRepresentativeImages(comicObjs, function (thumbnailArr) {
                    res.render('browseResults', { "Comics": comicObjs, "header": req.headers['host'] + "/webcomic/", "ComicCells": thumbnailArr });
                });
            });
        });
        router.get('/byGenre/zombies', function (req, res) {
            var browseService = new BrowseService.BrowseService(req, res);
            browseService.getZombieComics(function (comicObjs) {
                browseService.getRepresentativeImages(comicObjs, function (thumbnailArr) {
                    res.render('browseResults', { "Comics": comicObjs, "header": req.headers['host'] + "/webcomic/", "ComicCells": thumbnailArr });
                });
            });
        });
        router.get('/byGenre/post_apocalyptic', function (req, res) {
            var browseService = new BrowseService.BrowseService(req, res);
            browseService.getPostApocalypticComics(function (comicObjs) {
                browseService.getRepresentativeImages(comicObjs, function (thumbnailArr) {
                    res.render('browseResults', { "Comics": comicObjs, "header": req.headers['host'] + "/webcomic/", "ComicCells": thumbnailArr });
                });
            });
        });
        router.get('/byGenre/humor', function (req, res) {
            var browseService = new BrowseService.BrowseService(req, res);
            browseService.getHumorComics(function (comicObjs) {
                browseService.getRepresentativeImages(comicObjs, function (thumbnailArr) {
                    res.render('browseResults', { "Comics": comicObjs, "header": req.headers['host'] + "/webcomic/", "ComicCells": thumbnailArr });
                });
            });
        });
        router.get('/byGenre/superhero', function (req, res) {
            var browseService = new BrowseService.BrowseService(req, res);
            browseService.getSuperheroComics(function (comicObjs) {
                browseService.getRepresentativeImages(comicObjs, function (thumbnailArr) {
                    res.render('browseResults', { "Comics": comicObjs, "header": req.headers['host'] + "/webcomic/", "ComicCells": thumbnailArr });
                });
            });
        });
        router.get('/byGenre/action_adventure', function (req, res) {
            var browseService = new BrowseService.BrowseService(req, res);
            browseService.getActionAdventureComics(function (comicObjs) {
                browseService.getRepresentativeImages(comicObjs, function (thumbnailArr) {
                    res.render('browseResults', { "Comics": comicObjs, "header": req.headers['host'] + "/webcomic/", "ComicCells": thumbnailArr });
                });
            });
        });
        module.exports = router;
    };
    return Browse;
})();
var browse = new Browse();
browse.startBrowse();
