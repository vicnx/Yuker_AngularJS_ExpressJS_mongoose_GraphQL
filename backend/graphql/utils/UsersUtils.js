var mongoose = require('mongoose');
var User = mongoose.model('User');

async function updateKarma(user, qty) {
    var user=user;
    // console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww");
    // console.log(user);

    var user = await User.findOneAndUpdate({ _id: user.id }, { $inc: { karma: qty } }, { "fields": { karma: 1 }, new: true });
    if (user.karma < 0) {
        user.karma = 0;
        await user.save();
    }
}

exports.increaseKarmaByUserId = async function(id, qty) {
    var user = await User.findById(id);
    if (user)
        updateKarma(user, qty);
}

exports.increaseKarmaByNickname = async function(nickname, qty) {
    var user = await User.findOne({ username:nickname });
    if (user)
        updateKarma(user, qty);
}
