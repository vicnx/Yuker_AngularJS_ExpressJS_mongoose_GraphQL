var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var secret = require('../config').secret;

var UserSchema = new mongoose.Schema({
  username: String,//{type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
  email: String,//{type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
  bio: String,
  image: String,
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Yuk' }],
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Yuk' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  hash: String,
  salt: String,
  idsocial: {type: String, lowercase: true, unique: true},
}, {timestamps: true});

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.generateJWT = function() {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, secret);
};

UserSchema.methods.toAuthJSON = function(){
  return {
    username: this.username,
    email: this.email,
    token: this.generateJWT(),
    bio: this.bio,
    image: this.image
  };
};

UserSchema.methods.toProfileJSONFor = function(user){
  return {
    username: this.username,
    bio: this.bio,
    image: this.image || 'https://static.productionready.io/images/smiley-cyrus.jpg',
    following: user ? user.isFollowing(this._id) : false
  };
};

//likes
UserSchema.methods.like = function(id){
  if(this.likes.indexOf(id) === -1){
    this.likes=this.likes.concat(id);
  }

  return this.save();
};

UserSchema.methods.unlike = function(id){
  this.likes.remove(id);
  return this.save();
};

UserSchema.methods.isLike = function(id){
  return this.likes.some(function(likeId){
    return likeId.toString() === id.toString();
  });
};

//dislikes
UserSchema.methods.dislike = function(id){
  if(this.dislikes.indexOf(id) === -1){
    this.dislikes=this.dislikes.concat(id);
  }

  return this.save();
};

UserSchema.methods.undislike = function(id){
  this.dislikes.remove(id);
  return this.save();
};

UserSchema.methods.isDisLike = function(id){
  return this.dislikes.some(function(dislikeId){
    return dislikeId.toString() === id.toString();
  });
};


UserSchema.methods.follow = function(id){
  if(this.following.indexOf(id) === -1){
    this.following=this.following.concat(id);
    //this.following.push(id);
  }

  return this.save();
};

UserSchema.methods.unfollow = function(id){
  this.following.remove(id);
  return this.save();
};

UserSchema.methods.isFollowing = function(id){
  return this.following.some(function(followId){
    return followId.toString() === id.toString();
  });
};

mongoose.model('User', UserSchema);
