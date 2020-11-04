const mongoose = require('mongoose');
const Subscription = mongoose.model('Subscription');
const User = mongoose.model('User');
//const City = mongoose.model('City');



const resolvers = {
    Query: {
      subscription: (root, {slug}) => {
        return Subscription.findOne({slug: slug}).exec();
      },
      subscriptions: async (root, {user}) =>  {
        //si le pasamos user (email) recoge el ID del usuario y lo filtra.
        if(user){
          let usuario = await get_user_id(user)
          return Subscription.find({'user':usuario._id}).exec();
        }else{
          //si no le pasamos user los muestra todos
          return Subscription.find().exec();
        }
        
      },
      subscriptionsCount: () => {
        return Subscription.count().exec();
      }
    },
    Mutation: {
      createSubscription: async (root, {input}) => {
          input.user= await get_user_id(input.user);
          let subscription = new Subscription(input);
          await subscription.save();
          return subscription;

          // User.findOne({email: input.user}, async function(err, user){
          //   console.log(user.id);
          //   input.user = user.id;
          //   let subscription = new Subscription(input);
          //   console.log(input);
          //   await subscription.save();
          //   console.log(subscription);
          //   return subscription;
          // });
          
          
      }
    },
    //per a obtindre el user de cada sub
    Subscription: {
      user: (parent) => {
          return User.findOne({_id: parent.user}).exec();
      }
    }
};
//funcion para obtener el ID de un usuario por email
async function get_user_id(email){
  var user = await User.findOne({'email':email});
  return user;
}
module.exports = resolvers;