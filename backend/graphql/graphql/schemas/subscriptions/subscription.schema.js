const { gql } = require('apollo-server-express');

const typeDefs = gql`
    extend type Query {
        subscription(slug: String!): Subscription
        subscriptions(limit: Int, offset: Int,user: String): [Subscription]
        subscriptionsCount(user: String): Int
    }
    extend type Mutation {
        createSubscription(input: SubscriptionInput): Subscription
        deleteSubscription(input: DeleteInput): DeleteResponse
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
    type DeleteResponse{
        ok: Boolean!
    }
    input DeleteInput{
        slug: String!
    }
    input SubscriptionInput {
        type: String
        user: String
        username: String
        finish: Date
    }
`;

module.exports = typeDefs;