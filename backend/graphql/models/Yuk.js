var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');
var User = mongoose.model('User');

var YukSchema = new mongoose.Schema({
    slug: {type: String, lowercase: true, unique: true},
    title: String,
    content: String,
    image: String,
    likesCount: {type: Number, default: 0},
    dislikesCount: {type: Number, default: 0},
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    tagList: [{ type: String }],
  }, {timestamps: true});

//comprueba que los campos unicos lo sean
YukSchema.plugin(uniqueValidator, {message: 'is already taken'});

YukSchema.pre('validate', function(next){
    if(!this.slug)  {
      this.slugify();
    }
    next();
});

YukSchema.methods.slugify = function() {
  console.log(this);
    this.slug = slug(this.author.username) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
  };

YukSchema.methods.updateLikesCount = function() {
    var yuk = this;
  
    return User.count({likes: {$in: [yuk._id]}}).then(function(count){
      yuk.likesCount = count;
  
      return yuk.save();
    });
};

YukSchema.methods.updateDisLikesCount = function() {
  var yuk = this;

  return User.count({dislikes: {$in: [yuk._id]}}).then(function(count){
    yuk.dislikesCount = count;

    return yuk.save();
  });
};

YukSchema.methods.toJSONFor = function(user){
    return {
      slug: this.slug,
      title:this.title,
      content: this.content,
      image: this.image,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      liked: user ? user.isLike(this._id) : false,
      likesCount: this.likesCount,
      disliked: user ? user.isDisLike(this._id) : false,
      dislikesCount: this.dislikesCount,
      author: this.author.toProfileJSONFor(user),
      tagList: this.tagList,
      // comments: this.comments.toJSONFor(this._id)
    };
  };

  mongoose.model('Yuk', YukSchema);