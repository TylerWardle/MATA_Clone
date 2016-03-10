///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/> 

import Comic = require('../models/Comic');
import ComicCell = require('../models/ComicCell');

var express = require('express');
var router = express.Router();

export class SearchBrowseService{
    
    mongoose: any;
    schema: any;
    static comicModel: any = null;
    
    constructor(database:any) {    
        this.mongoose = database;
        this.schema = database.Schema; 
        SearchBrowseService.comicModel = this.mongoose.model('Comic',this.schema);;
    }
    
    getComics(request:string, callback: Function): any{
        var searchField = request.match(/=\w*/g)[0].substring(1);
        var searchType = request.match(/=\w*/g)[1].substring(1);
        
        switch(searchType){
            case "all":
                SearchBrowseService.comicModel.find({},function (err, comics) {
                if (err) return err;
                    callback(comics);
                })
                break;
            case "genre":
                SearchBrowseService.comicModel.find({'genre':searchField}, function (err, comics) {
                if (err) return err;
                    callback(comics);
                })
                break;
            case "title":
                SearchBrowseService.comicModel.find({'title':searchField}, function (err, comics) {
                if (err) return err;
                    callback(comics);
                })
                break;
            case "description":
                SearchBrowseService.comicModel.find({'description':searchField}, function (err, comics) {
                if (err) return err;
                    callback(comics);
                })
                break;
            case "toPublish":
                SearchBrowseService.comicModel.find({'toPublish':true}, function (err, comics) {
                if (err) return err;
                    callback(comics);
                })
                break;
            case "author":
                SearchBrowseService.comicModel.find({'toPublish':true,'normalized_authorUsername':searchField.toLowerCase()}, function (err, comics) {
                if (err) return err;
                    callback(comics);
                })
                break;        
                  
            default:   
        }
        
    }
    
    public getComicsPublishedByAuthor(authorUsername:string, callback: Function): any{
        SearchBrowseService.comicModel.find({'toPublish': true, 'authorUsername' : authorUsername }, function (err, comics) {
            if (err) return err;
            callback(comics);
        })
    }
        
}