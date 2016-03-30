import Comic = require('../models/Comic');
import ComicCell = require('../models/ComicCell');


export class BrowseService {
  req: any;
  res: any;

  constructor(req: any, res: any) {
    this.req = req;
    this.res = res;
  }

  // get representative images for comics
  getRepresentativeImages(comicObjs: any, callback: Function): any {
    var comicCellDAO = new ComicCell.ComicCell(this.req.mongoose);
    comicCellDAO.getThumbnail(comicObjs, (thumbnailArr: any): any => {
      callback(thumbnailArr);
    });
  }

  // get comics sorted alphabetically by title
  getComicsSortedByTitle(callback: Function): any {
    var comicDAO = new Comic.Comic(this.req.mongoose);
    comicDAO.getComicsSortedByTitle((comicObjs: any): any => {
      callback(comicObjs);
    })
  }

  // get comics sorted alphabetically by author
  getComicsSortedByAuthor(callback: Function): any {
    var comicDAO = new Comic.Comic(this.req.mongoose);
    comicDAO.getComicsSortedByAuthor((comicObjs: any): any => {
      callback(comicObjs);
    })
  }

  getLeastRecentlyPublishedComics(callback: Function): any {
    var comicDAO = new Comic.Comic(this.req.mongoose);
    comicDAO.getComicsSortedByLeastRecentlyPublished((comicObjs: any): any => {
      callback(comicObjs);
    })
  }

  getMostRecentlyPublishedComics(callback: Function): any {
    var comicDAO = new Comic.Comic(this.req.mongoose);
    comicDAO.getComicsSortedByMostRecentlyPublished((comicObjs: any): any => {
      callback(comicObjs);
    })
  }

  getZombieComics(callback: Function): any {
    var comicDAO = new Comic.Comic(this.req.mongoose);
    comicDAO.getZombiesComics((comicObjs: any): any => {
      callback(comicObjs);
    })
  }

  getPostApocalypticComics(callback: Function): any {
    var comicDAO = new Comic.Comic(this.req.mongoose);
    comicDAO.getPostApocalypticComics((comicObjs: any): any => {
      callback(comicObjs);
    })
  }

  getHumorComics(callback: Function): any {
    var comicDAO = new Comic.Comic(this.req.mongoose);
    comicDAO.getHumorComics((comicObjs: any): any => {
      callback(comicObjs);
    })
  }

  getSuperheroComics(callback: Function): any {
    var comicDAO = new Comic.Comic(this.req.mongoose);
    comicDAO.getSuperheroComics((comicObjs: any): any => {
      callback(comicObjs);
    })
  }

  getActionAdventureComics(callback: Function): any {
    var comicDAO = new Comic.Comic(this.req.mongoose);
    comicDAO.getActionAdventureComics((comicObjs: any): any => {
      callback(comicObjs);
    })
  }
}
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