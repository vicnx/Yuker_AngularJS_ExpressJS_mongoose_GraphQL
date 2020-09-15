var router = require('express').Router();
var mongoose = require('mongoose');
var Yuk = mongoose.model('Yuk');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');
var auth = require('../auth');

// Preload yuk objects on routes with ':yuk'
//sirve para buscar un yuk concreto
router.param('yuk', function(req, res, next, slug) {
    yuk.findOne({ slug: slug})
      .populate('author')
      .then(function (yuk) {
        if (!yuk) { return res.sendStatus(404); }
  
        req.yuk = yuk;
  
        return next();
      }).catch(next);
});

//aqui saca los comentarios de ese yuk
router.param('comment', function(req, res, next, id) {
    Comment.findById(id).then(function(comment){
      if(!comment) { return res.sendStatus(404); }
  
      req.comment = comment;
  
      return next();
    }).catch(next);
});

router.get('/', auth.optional, function(req, res, next) {
    var query = {};
    var limit = 20;
    var offset = 0;
  
    if(typeof req.query.limit !== 'undefined'){
      limit = req.query.limit;
    }
  
    if(typeof req.query.offset !== 'undefined'){
      offset = req.query.offset;
    }
  
    if( typeof req.query.tag !== 'undefined' ){
      query.tagList = {"$in" : [req.query.tag]};
    }
  
    Promise.all([
      req.query.author ? User.findOne({username: req.query.author}) : null,
      req.query.liked ? User.findOne({username: req.query.liked}) : null
    ]).then(function(results){
      var author = results[0];
      var liker = results[1];
  
      if(author){
        query.author = author._id;
      }
  
      if(liker){
        query._id = {$in: liker.likes};
      } else if(req.query.liked){
        query._id = {$in: []};
      }
  
      return Promise.all([
        yuk.find(query)
          .limit(Number(limit))
          .skip(Number(offset))
          .sort({createdAt: 'desc'})
          .populate('author')
          .exec(),
        yuk.count(query).exec(),
        req.payload ? User.findById(req.payload.id) : null,
      ]).then(function(results){
        var yuks = results[0];
        var yuksCount = results[1];
        var user = results[2];
  
        return res.json({
          yuks: yuks.map(function(yuk){
            return yuk.toJSONFor(user);
          }),
          yuksCount: yuksCount
        });
      });
    }).catch(next);
});