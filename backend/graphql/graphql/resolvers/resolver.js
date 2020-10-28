var merge = require('lodash');

const QueryResolvers = {
  Query: {
      message: () => 'Hello World!',
      authenticationError: () => {
        throw new AuthenticationError('must authenticate');
      }
  }
}

var SubscriptionResolvers = require('./subscriptions/subscription.resolver');
var UserResolvers = require('./users/user.resolver');

const resolvers = merge(
  QueryResolvers,
  SubscriptionResolvers,
  UserResolvers
);

module.exports = resolvers;