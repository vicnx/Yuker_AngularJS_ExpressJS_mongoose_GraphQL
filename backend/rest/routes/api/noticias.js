var router = require('express').Router();
var mongoose = require('mongoose');
var Noticia = mongoose.model('Noticia');
var User = mongoose.model('User');
var auth = require('../auth');

// Preload noticia objects on routes with ':noticia'
//sirve para buscar un noticia concreto
router.param('noticia', function(req, res, next, slug) {
    Noticia.findOne({ slug: slug})
      .populate('author')
      .then(function (noticia) {
        if (!noticia) { return res.sendStatus(404); }
  
        req.noticia = noticia;
  
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
        Noticia.find(query)
          .limit(Number(limit))
          .skip(Number(offset))
          .sort({createdAt: 'desc'})
          .populate('author')
          .exec(),
        Noticia.count(query).exec(),
        req.payload ? User.findById(req.payload.id) : null,
      ]).then(function(results){
        var noticias = results[0];
        var noticiasCount = results[1];
        var user = results[2];
  
        return res.json({
          noticias: noticias.map(function(noticia){
            return noticia.toJSONFor(user);
          }),
          noticiasCount: noticiasCount
        });
      });
    }).catch(next);
});


router.get('/feed', auth.required, function(req, res, next) {
  var limit = 20;
  var offset = 0;

  if(typeof req.query.limit !== 'undefined'){
    limit = req.query.limit;
  }

  if(typeof req.query.offset !== 'undefined'){
    offset = req.query.offset;
  }

  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    Promise.all([
      Noticia.find({ author: {$in: user.following}})
        .limit(Number(limit))
        .skip(Number(offset))
        .populate('author')
        .exec(),
      Noticia.count({ author: {$in: user.following}})
    ]).then(function(results){
      var noticias = results[0];
      var noticiasCount = results[1];

      return res.json({
        noticias: noticias.map(function(noticia){
          return noticia.toJSONFor(user);
        }),
        noticiasCount: noticiasCount
      });
    }).catch(next);
  });
});

router.post('/', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    var noticia = new Noticia(req.body.noticia);

    noticia.author = user;

    return noticia.save().then(function(){
      console.log(noticia.author);
      return res.json({noticia: noticia.toJSONFor(user)});
    });
  }).catch(next);
});

// return a noticia
router.get('/:noticia', auth.optional, function(req, res, next) {
  Promise.all([
    req.payload ? User.findById(req.payload.id) : null,
    req.noticia.populate('author').execPopulate()
  ]).then(function(results){
    var user = results[0];

    return res.json({noticia: req.noticia.toJSONFor(user)});
  }).catch(next);
});

// update noticia
router.put('/:noticia', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if(req.noticia.author._id.toString() === req.payload.id.toString()){
      if(typeof req.body.noticia.contenido !== 'undefined'){
        req.noticia.contenido = req.body.noticia.contenido;
      }

      if(typeof req.body.noticia.titulo !== 'undefined'){
        req.noticia.titulo = req.body.noticia.titulo;
      }

      if(typeof req.body.noticia.tagList !== 'undefined'){
        req.noticia.tagList = req.body.noticia.tagList
      }

      req.noticia.save().then(function(noticia){
        return res.json({noticia: noticia.toJSONFor(user)});
      }).catch(next);
    } else {
      return res.sendStatus(403);
    }
  });
});

// delete noticia
router.delete('/:noticia', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    if(req.noticia.author._id.toString() === req.payload.id.toString()){
      return req.noticia.remove().then(function(){
        return res.sendStatus(204);
      });
    } else {
      return res.sendStatus(403);
    }
  }).catch(next);
});

// Like an noticia
router.post('/:noticia/like', auth.required, function(req, res, next) {
  var noticiaId = req.noticia._id;

  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    return user.like(noticiaId).then(function(){
      return req.noticia.updateLikesCount().then(function(noticia){
        return res.json({noticia: noticia.toJSONFor(user)});
      });
    });
  }).catch(next);
});

// Unlike an noticia
router.delete('/:noticia/like', auth.required, function(req, res, next) {
  var noticiaId = req.noticia._id;

  User.findById(req.payload.id).then(function (user){
    if (!user) { return res.sendStatus(401); }

    return user.unlike(noticiaId).then(function(){
      return req.noticia.updateLikesCount().then(function(noticia){
        return res.json({noticia: noticia.toJSONFor(user)});
      });
    });
  }).catch(next);
});

module.exports = router;