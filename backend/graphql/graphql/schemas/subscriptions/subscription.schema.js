const { gql } = require('apollo-server-express');

const typeDefs = gql`
    extend type Query {
        subscription(slug: String!): Subscription
        subscriptions: [Subscription]
        subscriptionsCount: Int
    }
    extend type Mutation {
        createSubscription(input: SubscriptionInput): Subscription
    }
    type Subscription {
        id: ID!
        slug: String!
        type: String
        user: User
        start: Date
        finish: Date
        active: Boolean
    }
    input SubscriptionInput {
        type: String
        user: String
    }
`;

module.exports = typeDefs;