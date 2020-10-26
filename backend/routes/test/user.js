var router = require('express').Router();
var faker = require('faker');
faker.locale = "es";
var mongoose = require('mongoose');
var Yuk = mongoose.model('Yuk');
var User = mongoose.model('User');
var utils = require('./utils');
var user_utils = require('../../utils/UsersUtils');
// import { increaseKarmaByNickname } from '../../../utils/UsersUtils';

console.log(user_utils);

router.post('/karma/increase/user/nickname/:nickname/:qty', async(req, res, next) => {
    console.log("Dentro del post de la ruta");
    try {
        await user_utils.increaseKarmaByNickname(req.params.nickname, req.params.qty);
        return res.sendStatus(200);
    } catch (e) {
        next(e);
    }
});

router.post('/karma/increase/user/id/:id/:qty', async(req, res, next) => {
    try {
        await user_utils.increaseKarmaByUserId(req.params.id, req.params.qty);
        return res.sendStatus(200);
    } catch (e) {
        next(e);
    }
});

module.exports = router;