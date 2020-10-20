var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.SearchUser = async function (email){
    // var user = await User.find({'email':email});
    var user = await User.findOne({'email':email});
    // console.log("---------------------------------------------------------email--------------------------------------------------");
    // console.log(email);
    // console.log("---------------------------------------------------------USER--------------------------------------------------");
    // console.log(user);
    return user;
}
