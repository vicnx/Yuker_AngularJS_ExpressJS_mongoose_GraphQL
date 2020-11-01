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
      let deferred = this._$q.defer();
  
      if (!slug.replace(" ", "")) {
        deferred.reject("Subscription slug is empty");
        
        return deferred.promise;
      }
  
      let query = `
        query getSubscription {
          subscription(slug:"${slug}") {
            id
            title
            slug
            description
            streetAddress
            reservePrice
            city {
              id
              slug
              name
              country {
                id
                slug
                name
              }
            }
          }
        }
      `;
      return this._GQL.getAuth(query);
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

    // destroy(slug) {
    //   return this._$http({
    //     url: this._AppConstants.rest + '/restaurants/' + slug,
    //     method: 'DELETE'
    //   })
    // }
  
    // save(restaurant) {
    //   let request = {};
  
    //   if (restaurant.slug) {
    //     request.url = `${this._AppConstants.rest}/restaurants/${restaurant.slug}`;
    //     request.method = 'PUT';
    //     delete restaurant.slug;
  
    //   } else {
    //     request.url = `${this._AppConstants.rest}/restaurants/`;
    //     request.method = 'POST';
    //   }
  
    //   request.data = { restaurant: restaurant };
  
    //   return this._$http(request).then((res) => res.data.restaurant);
    // }
  
  
    // favorite(slug) {
    //   return this._$http({
    //     url: this._AppConstants.rest + '/restaurants/' + slug + '/favorite',
    //     method: 'POST'
    //   })
    // }
  
    // unfavorite(slug) {
    //   return this._$http({
    //     url: this._AppConstants.rest + '/restaurants/' + slug + '/favorite',
    //     method: 'DELETE'
    //   })
    // }
  
  
  }
  