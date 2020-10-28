var router = require('express').Router();

router.use('/test_search', require('./test_search'));
router.use('/fake', require('./fake'));
router.use('/user', require('./user'));

module.exports = router;