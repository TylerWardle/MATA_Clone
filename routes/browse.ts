///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 

import BrowseService = require('../services/BrowseService');

class Browse {
    constructor() {}

    startBrowse() {

  		var express = require('express');
  		var router = express.Router();
  		
  		router.get('/', function(req, res) {
  			res.render('browse');   
  		});

      router.get('/byTitle', function(req, res) {
        var browseService = new BrowseService.BrowseService(req, res);
        browseService.getComicsSortedByTitle((comicObjs: any): any => {
          res.render('browse'); 
        });
      });

      router.get('/byAuthor', function(req, res) {
        var browseService = new BrowseService.BrowseService(req, res);
        browseService.getComicsSortedByAuthor((comicObjs: any): any => {
          res.render('browse');
        });
      });

      router.get('/byPublicationDate/Oldest', function(req, res) {
        var browseService = new BrowseService.BrowseService(req, res);
        browseService.getLeastRecentlyPublishedComics((comicObjs: any): any => {
          res.render('browse'); 
        });
      });

      router.get('/byPublicationDate/Newest', function(req, res) {
        var browseService = new BrowseService.BrowseService(req, res);
        browseService.getMostRecentlyPublishedComics((comicObjs: any): any => {
          res.render('browse'); 
        });
      });

      router.get('/byGenre/zombies', function(req, res) {
        var browseService = new BrowseService.BrowseService(req, res);
        browseService.getZombieComics((comicObjs: any): any => {
          res.render('browse'); 
        });
      });
      router.get('/byGenre/post_apocalyptic', function(req, res) {
        var browseService = new BrowseService.BrowseService(req, res);
        browseService.getPostApocalypticComics((comicObjs: any): any => {
          res.render('browse'); 
        });
      });
      router.get('/byGenre/humor', function(req, res) {
        var browseService = new BrowseService.BrowseService(req, res);
        browseService.getHumorComics((comicObjs: any): any => {
          res.render('browse'); 
        });
      });
      router.get('/byGenre/superhero', function(req, res) {
        var browseService = new BrowseService.BrowseService(req, res);
        browseService.getSuperheroComics((comicObjs: any): any => {
          res.render('browse'); 
        });
      });
      router.get('/byGenre/action_adventure', function(req, res) {
        var browseService = new BrowseService.BrowseService(req, res);
        browseService.getActionAdventureComics((comicObjs: any): any => {
          res.render('browse'); 
        });
      });

  		module.exports = router;    
    }       
}

var browse = new Browse();
browse.startBrowse();