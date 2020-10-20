var router = require('express').Router();
var faker = require('faker');
var mongoose = require('mongoose');
var Yuk = mongoose.model('Yuk');
var User = mongoose.model('User');
var utils = require('./utils');

/*----------------------------------------------------------
------------------------- FAKER YUKS -----------------------
--- http://localhost:3000/test/fake/yuks/10/test@test.com --
------------------------------------------------------------
------ Revisar el correo ya que si no existe fallará -------
----------------------------------------------------------*/


router.post('/yuks/:qty/:email', async function(req, res, next) {
    // console.log(req.params);
    try {
        var qty = req.params.qty;
        //recogemos el email
        var email = req.params.email
        //primero obtenemos un usuario (en mi caso el que contiene este correo)
        var user = await utils.SearchUser(email);
        //hacemos un bucle por la cantidad
        for (let i = 0; i < qty; i++) {
            //ahora creamos la estructura de un yuk
            var yuk = await new Yuk({
                title: faker.lorem.words(),
                content: faker.lorem.paragraphs(),
                author:"",
                tagList : [ "fake","dummies" ]
            })
            //añadimos el usuario al campo author
            yuk.author = user;
            //y lo guardamos.
            yuk.save();
        }
        return res.sendStatus(200);    
    } catch (e) {
        next(e);
    }
});

module.exports = router;