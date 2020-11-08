var { ApolloServer}  = require('apollo-server-express');
var { AuthenticationError } = require('apollo-server-express');
var typeDefs = require('../../graphql/schemas/schema');
var resolvers = require('../../graphql/resolvers/resolver');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const request = require('./requests')

const SERVER = new ApolloServer({
    typeDefs,
    resolvers
});

const SERVERAUTH = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        let user = null;
        if (req.payload) {
            //nos conectamos al api rest pasando el token por headers para recojer la informacion de ese user.
            user = await request.get_user_token(req.headers.authorization.split(' ')[1]);
            // user = await User.findById(req.payload.id);
        } // else do nothing and let user be null
        
        // add the user to the context
        return { user, AuthenticationError };
    }
});

const SERVERS = {
    graphql: SERVER,
    graphqlauth: SERVERAUTH
};
// console.log("+++++++++++++++++++++++++++++SERVERS++++++++++++++++++++++++++++++++++++");
// console.log(SERVERS);

module.exports = SERVERS;


