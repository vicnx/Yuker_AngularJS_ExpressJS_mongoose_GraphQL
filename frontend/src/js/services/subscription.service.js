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

      if(!config.filters.email){
        config.filters.email = null;
      }
      let query = `
      query getSubscriptionsAndCount {
        subscriptions(user:${config.filters.email}) {
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
      // if(config.filters.email){
      //   query = `
      //   query getSubscriptionsAndCount {
      //     subscriptions(user:"${config.filters.email}") {
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
      // }
      console.log(config.filters);
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
  
    // getSubscriptionsByType(type) {
    //   let query = `
    //     query {
    //       restaurantsResults(slug:"${type}") {
    //           id
    //           slug
    //           title
    //           description
    //           reservePrice
    //           streetAddress
    //           image
    //         }
    //     }
    //   `;
    //   return this._GQL.get(query);
    // }
    
    mute(SubscriptionInput){
      let mutation = `
        mutation createSubscription($input: SubscriptionInput) {
          createSubscription(input: $input) {
            id
            slug
            type
            user{
              username
            }
            start
            finish
            active
          }
        }
      `;
      // console.log(mutation);
      //en el return le pasamos la mutation y el INPUT
      return this._GQL.mute(mutation,SubscriptionInput);
    }
  
  
  }
  