var router = require('express').Router();
var mongoose = require('mongoose');
// var Article = mongoose.model('Article');
var Yuk = mongoose.model('Yuk');

// return a list of tags
router.get('/', function(req, res, next) {
  Yuk.find().distinct('tagList').then(function(tags){
    return res.json({tags: tags});
  }).catch(next);
});

module.exports = router;
