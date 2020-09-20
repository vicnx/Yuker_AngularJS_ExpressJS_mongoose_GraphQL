var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');
var User = mongoose.model('User');

var NoticiaSchema = new mongoose.Schema({
    slug: {type: String, lowercase: true, unique: true},
    titulo: String,
    contenido: String,
    likesCount: {type: Number, default: 0},
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    tagList: [{ type: String }],
  }, {timestamps: true});

//comprueba que los campos unicos lo sean
NoticiaSchema.plugin(uniqueValidator, {message: 'is already taken'});

NoticiaSchema.pre('validate', function(next){
    if(!this.slug)  {
      this.slugify();
    }
    next();
});

NoticiaSchema.methods.slugify = function() {
    this.slug = 'noticia-'+slug(this.titulo) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
  };

NoticiaSchema.methods.updateLikesCount = function() {
    var noticia = this;
  
    return User.count({likes: {$in: [noticia._id]}}).then(function(count){
      noticia.likesCount = count;
  
      return noticia.save();
    });
};

NoticiaSchema.methods.toJSONFor = function(user){
    return {
      slug: this.slug,
      titulo:this.titulo,
      contenido: this.contenido,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      liked: user ? user.isLike(this._id) : false,
      likesCount: this.likesCount,
      author: this.author.toProfileJSONFor(user),
      tagList: this.tagList,
      // comments: this.comments.toJSONFor(this._id)
    };
  };

  mongoose.model('Noticia', NoticiaSchema);