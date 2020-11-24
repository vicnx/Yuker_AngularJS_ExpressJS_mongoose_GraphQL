var router = require('express').Router();
let client = require('prom-client');

router.get('/', (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(client.register.metrics());
});
module.exports = router;