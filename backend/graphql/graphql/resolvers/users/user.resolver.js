const mongoose = require('mongoose');
const User = mongoose.model('User');

const resolvers = {
    Query: {
      user: (root, {username}) => {
        return User.findOne({username: username}).exec();
      },
      users: () => {
        return User.find().exec();
      },
    }
};

module.exports = resolvers;