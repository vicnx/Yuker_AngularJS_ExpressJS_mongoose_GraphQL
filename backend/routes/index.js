var router = require('express').Router();

router.use('/api', require('./api'));
router.use('/test', require('./test'));
// router.use('/docs', require('./docs'));



module.exports = router;
