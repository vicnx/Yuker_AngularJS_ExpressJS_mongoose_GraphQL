var router = require('express').Router();
var SERVERS = require('./graphql');

// router.use('/docs', graphiqlExpress({ endpointURL: '/graphql' }))
router.use('/graphqlauth', require('../auth').required); // not nice
SERVERS.graphqlauth.applyMiddleware({ app: router, path:'/graphqlauth'});
SERVERS.graphql.applyMiddleware({ app: router, path:'/graphql' });

router.use(function(err, req, res, next){
  if(err.name === 'ValidationError'){
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function(errors, key){
        errors[key] = err.errors[key].message;

        return errors;
      }, {})
    });
  }

  return next(err);
});

module.exports = router;