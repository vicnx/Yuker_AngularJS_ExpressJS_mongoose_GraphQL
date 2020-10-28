var router = require('express').Router();
var mongoose = require('mongoose');
// var Article = mongoose.model('Article');
var Yuk = mongoose.model('Yuk');
var Noticia = mongoose.model('Noticia');

// return a list of tags
router.get('/yuks', function(req, res, next) {
  Yuk.find().distinct('tagList').then(function(tags){
    return res.json({tags: tags});
  }).catch(next);
});

router.get('/noticias', function(req, res, next) {
  Noticia.find().distinct('tagList').then(function(tags){
    return res.json({tags: tags});
  }).catch(next);
});

module.exports = router;
