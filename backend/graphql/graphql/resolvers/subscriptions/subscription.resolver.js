const mongoose = require('mongoose');
const Subscription = mongoose.model('Subscription');
const User = mongoose.model('User');
//const City = mongoose.model('City');

const resolvers = {
    Query: {
      subscription: (root, {slug}) => {
        return Subscription.findOne({slug: slug}).exec();
      },
      subscriptions: () =>  {
        return Subscription.find().exec();
      }
    },
    Mutation: {
      createSubscription: (root, {input}) => {
          const subscription = new Subscription(input);
          // no .exec();
          subscription.save();
          console.log(subscription);
          return subscription;
      }
    },
    //per a obtindre el user de cada sub
    Subscription: {
      user: (parent) => {
          return User.findOne({_id: parent.user}).exec();
      }
    }
};

module.exports = resolvers;