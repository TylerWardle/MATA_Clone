///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>
var Comic = require('../models/Comic');
var ComicCell = require('../models/ComicCell');
var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var FavoritesServiceProvider = (function () {
    function FavoritesServiceProvider() {
    }
    FavoritesServiceProvider.prototype.Favoriting = function (req, res) {
        var db = req.db;
        var comicID = req.params.id;
        var registeredUsers = db.get('registeredUsers');
        var c = new Comic.Comic(req.mongoose);
        registeredUsers.findOne({ _id: req.cookies._id }, function (err, user) {
            c.get(comicID, function (webcomic) {
                var title = webcomic.title;
                var toPublish = webcomic.toPublish;
                var publicationDate = webcomic.publicationDate;
                var description = webcomic.description;
                var genre = webcomic.genre;
                var authorID = webcomic.authorID;
                var authorUsername = webcomic.authorUsername;
                var openToContribution = webcomic.openToContribution;
                var openToCommenting = webcomic.openToCommenting;
                var thumbnailID = webcomic.thumbnailID;
                var upvotes = webcomic.upvotes;
                var votedPpl = webcomic.votedPpl;
                var fave = webcomic.fave;
                console.log(fave);
                var vv = false;
                var uu = null;
                var favb = false;
                for (var j = 0, len = fave.length; j < len; j++) {
                    if (fave[j] == user.username) {
                        favb = true;
                        break;
                    }
                }
                if (req.param('op_u') && vv == false) {
                    upvotes++;
                    votedPpl.push({ id: user.username, votetype: 1 });
                }
                else if (req.param('op_d') && vv == false) {
                    upvotes--;
                    votedPpl.push({ id: user.username, votetype: -1 });
                }
                c.update(comicID, title, authorID, authorUsername, publicationDate, description, genre, toPublish, openToContribution, openToCommenting, thumbnailID, upvotes, votedPpl, fave, function () {
                    // redirect client to updated comic web page
                    var cc = new ComicCell.ComicCell(req.mongoose);
                    //used to inform the client if the user is the author of a webcomic they are viewing
                    var isAuthor = false;
                    if (req.cookies._id == webcomic.authorID) {
                        isAuthor = true;
                    }
                    cc.getAll(comicID, function (docs) {
                        res.redirect('/webcomic/id/' + comicID);
                        /*/res.render('webcomic', { "user": user,
                                                 "webcomic": webcomic,
                                                 "cells": docs,
                                                 "header": req.headers['host'] + "/webcomic/image/",
                                                 "isAuthor": isAuthor,
                                                 "accountType": req.cookies.accountType});/*/
                    });
                });
            });
        });
        return true;
    };
    return FavoritesServiceProvider;
})();
exports.FavoritesServiceProvider = FavoritesServiceProvider;
