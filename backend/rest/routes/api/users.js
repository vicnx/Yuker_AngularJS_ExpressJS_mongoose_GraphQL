var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var User = mongoose.model('User');
var auth = require('../auth');

router.get('/user', auth.required, function(req, res, next){
  User.findById(req.payload.id).then(function(user){
    if(!user){ return res.sendStatus(401); }

    return res.json({user: user.toAuthJSON()});
  }).catch(next);
});

router.put('/user', auth.required, function(req, res, next){
  User.findById(req.payload.id).then(function(user){
    if(!user){ return res.sendStatus(401); }

    // only update fields that were actually passed...
    if(typeof req.body.user.username !== 'undefined'){
      user.username = req.body.user.username;
    }
    if(typeof req.body.user.email !== 'undefined'){
      user.email = req.body.user.email;
    }
    if(typeof req.body.user.bio !== 'undefined'){
      user.bio = req.body.user.bio;
    }
    if(typeof req.body.user.image !== 'undefined'){
      user.image = req.body.user.image;
    }
    if(typeof req.body.user.password !== 'undefined'){
      user.setPassword(req.body.user.password);
    }

    return user.save().then(function(){
      return res.json({user: user.toAuthJSON()});
    });
  }).catch(next);
});

router.post('/users/login', function(req, res, next){
  console.log(req.body)
  if(!req.body.user.email){
    console.log("no email")
    return res.status(422).json({errors: {email: "can't be blank"}});
  }

  if(!req.body.user.password){
    return res.status(422).json({errors: {password: "can't be blank"}});
  }

  passport.authenticate('local', {session: false}, function(err, user, info){
    if(err){ return next(err); }

    if(user){
      user.token = user.generateJWT();
      return res.json({user: user.toAuthJSON()});
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});

router.post('/users', function(req, res, next){
  var user = new User();
  // console.log(user);

  user.username = req.body.user.username;
  user.email = req.body.user.email;
  user.setPassword(req.body.user.password);
  user.idsocial = req.body.user.username;
  //comprobamos si existe ya el usuario
  User.find( { $or:[ {'username':user.username}, {'idsocial':user.idsocial}]}, 
  function(err,user){
    if(user[0]){
      return res.sendStatus(422).json("Email or username already used");
    }
  }).then()
  // if(!data){
    user.save().then(function(){
      return res.json({user: user.toAuthJSON()});
    }).catch(next)
  // }



});
//social login

router.post("/users/sociallogin", function(req, res, next) {
  let memorystore = req.sessionStore;
  let sessions = memorystore.sessions;
  let sessionUser;
  for (var key in sessions) {
    sessionUser = JSON.parse(sessions[key]).passport.user;
  }

  User.find({ _id: sessionUser }, function(err, user) {
    user = user[0];

    if (err) return done(err);
    // if the user is found then log them in
    if (user) {
      user.token = user.generateJWT();
      return res.json({ user: user.toAuthJSON() }); // user found, return that user
    } else {
      return res.status(422).json(err);
    }
  });
});

router.get("/auth/github", passport.authenticate("github"));

router.get("/auth/github/callback",
  passport.authenticate("github", {
    successRedirect: "http://localhost:4000/#!/auth/sociallogin",
    failureRedirect: "/"
  })
);

//GLUGLU
router.get('/auth/google',
  passport.authenticate('google', { scope: 
      [ 'https://www.googleapis.com/auth/plus.login',
      , 'https://www.googleapis.com/auth/plus.profile.emails.read',
      , 'https://www.googleapis.com/auth/userinfo.profile',
      , 'https://www.googleapis.com/auth/userinfo.email' ] }
));

router.get("/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:4000/#!/auth/sociallogin",
    failureRedirect: "/"
  })
);

//get user by token
router.get('/user_full', auth.required, function(req, res, next){
  User.findById(req.payload.id).then(function(user){
    if(!user){ return res.sendStatus(401); }
    return res.json({user: user});
  }).catch(next);
});

router.param('iduser', function(req, res, next, iduser){
  User.findOne({_id: iduser}).then(function(user){
    if (!user) { return res.sendStatus(404); }

    req.user = user;

    return next();
  }).catch(next);
});

router.param('email', function(req, res, next, email){
  User.findOne({email: email}).then(function(user){
    if (!user) { return res.sendStatus(404); }

    req.user = user;

    return next();
  }).catch(next);
});

router.get('/user_id/:iduser', function(req, res, next){
  return res.json(req.user);
});

router.get('/user_email/:email', function(req, res, next){
  return res.json(req.user);
});

module.exports = router;
