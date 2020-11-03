export default class Subscriptions {
    constructor(AppConstants, $http, $q,GraphQLClient) {
      'ngInject';
  
      this._AppConstants = AppConstants;
      this._$http = $http;
      this._$q = $q;
      this._GQL = GraphQLClient;
  
    }

    query(config) {
      if (!config.filters.offset) {
        config.filters.offset = 0;
      }
      if (!config.filters.limit) {
        config.filters.limit = 8;
      }
    //   let query = `
    //   query getSubscriptionsAndCount {
    //     subscriptions(limit:${config.filters.limit},offset:${config.filters.offset}) {
    //       type
    //       slug
    //       user{
    //         username
    //         id
    //       }
    //       start
    //       finish
    //       active
    //     }
    //     subscriptionsCount
    //   }
    // `;
      let query = `
        query getSubscriptionsAndCount {
          subscriptions {
            type
            slug
            user{
              username
              id
            }
            start
            finish
            active
          }
          subscriptionsCount
        }
      `;
      return this._GQL.get(query);
    }
  
    get(slug) {

      
      let query = `
        query getSubscription {
          subscription(slug:"${slug}") {
            id
            type
            slug
            user{
              id
              username
              image
            }
            start
            finish
            active
          }
        }
      `;
      console.log(query);
      return this._GQL.get(query);
    }
  
    getSubscriptionsByType(type) {
      let query = `
        query {
          restaurantsResults(slug:"${type}") {
              id
              slug
              title
              description
              reservePrice
              streetAddress
              image
            }
        }
      `;
      return this._GQL.get(query);
    }
    
  
  
  }
  