// const express = require('express');
const { gql } = require('apollo-server-express');
// var { gql } = require('graphql-tag');
// import {gql} from 'apollo-server-express';


// console.log(gql);

const Query = gql`
    scalar Date
    type Query {
        message: String
        authenticationError: String
    }
    type Mutation {
        _empty: String
    }
`;

var Subscription = require('./subscriptions/subscription.schema');
var User = require('./users/user.schema');

const typeDefs = [
    Query,
    Subscription,
    User
];

module.exports = typeDefs;