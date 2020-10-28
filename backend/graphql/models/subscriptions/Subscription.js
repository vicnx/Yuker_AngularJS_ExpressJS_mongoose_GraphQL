var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');
// require('./Subscription');

// var User = mongoose.model('User');

var SubscriptionSchema = new mongoose.Schema({
  slug: {type: String, lowercase: true, unique: true},
  type: String,
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  start: { type: Date, default: Date.now },
  finish: { type: Date, default: Date.now },
  active: { type: Boolean, default: true }
}, {
  timestamps: true,
  usePushEach: true
});

SubscriptionSchema.plugin(uniqueValidator, {message: 'is already taken'});

SubscriptionSchema.pre('validate', function(next){
  if(!this.slug)  {
    this.slugify();
  }
  next();
});

SubscriptionSchema.methods.slugify = function() {
    this.slug = slug(this.type) + '#' + Math.floor(1000 + Math.random() * 9000);
};

SubscriptionSchema.methods.toJSONFor = function(user){  
  return {
    slug: this.slug,
    type: this.type,
    user: this.user.toProfileJSONFor(user),
    start: this.start,
    finish: this.finish,
    active: this.active
  };
};

mongoose.model('Subscription', SubscriptionSchema);