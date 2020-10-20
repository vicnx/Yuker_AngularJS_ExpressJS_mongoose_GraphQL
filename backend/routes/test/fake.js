var router = require('express').Router();
var faker = require('faker');
faker.locale = "es";
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

    createyuks(req.params.email,req.params.qty);
});

//FAKER DE USUARIOS
router.post('/users/:qty', async function(req, res, next) {
    try {
        for (let i = 0; i < req.params.qty; i++) {
            var user = await new User();
            // console.log(user);
            user.username = faker.internet.userName();
            user.email = faker.internet.email();
            user.setPassword("12345678");
            user.idsocial = user.username+faker.random.number();
            user.image = faker.internet.avatar();
            //comprobamos si existe ya el usuario
            var ok = await User.find( { $or:[ {'username':user.username}, {'idsocial':user.idsocial}]});
            if(!ok[0]){
                console.log(user);
                await user.save();
            }
            //a cada nuevo usuario le metemos 5 YUKS
            await createyuks(user.email,5);
        }
        return res.sendStatus(200); 
    } catch (e) {x
        next(e)
    }
});

//function que te cra yuks
async function createyuks(email,qty){
    try {
        //recogemos el email
        var email = email
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
            // console.log(yuk);
            await yuk.save();
        }
        console.log("OKaaay");   
    } catch (e) {
        console.log(e);
    }
}

module.exports = router;