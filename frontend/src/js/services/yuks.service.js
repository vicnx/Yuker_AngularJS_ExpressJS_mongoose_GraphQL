export default class Yuks {
  constructor(AppConstants, $http, $q) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;
    this._$q = $q;


  }

  /*
    Config object spec:

    {
      type: String [REQUIRED] - Accepts "all", "feed"
      filters: Object that serves as a key => value of URL params (i.e. {author:"ericsimons"} )
    }
  */
  getAllYuks(){
    return this._$http({
      url: this._AppConstants.api + "/yuks/",
      method: "GET"
    }).then(res => {
      return res.data.yuks;
    });
  }
  query(config) {
    console.log(config);
    // Create the $http object for this request
    let request = {
      url: this._AppConstants.api + '/yuks' + ((config.type === 'feed') ? '/feed' : ''),
      method: 'GET',
      params: config.filters ? config.filters : null
    };
    return this._$http(request).then((res) => res.data);
  }

  get(slug) {
    let deferred = this._$q.defer();

    if (!slug.replace(" ", "")) {
      deferred.reject("Yuks slug is empty");
      return deferred.promise;
    }

    this._$http({
      url: this._AppConstants.api + '/yuks/' + slug,
      method: 'GET'
    }).then(
      (res) => deferred.resolve(res.data.yuk),
      (err) => deferred.reject(err)
    );

    return deferred.promise;
  }

  deleteYuk(slug) {
    return this._$http({
      url: this._AppConstants.api + '/yuks/' + slug,
      method: 'DELETE'
    })
  }

  save(yuk) {
    let request = {};

    if (yuk.slug) {
      request.url = `${this._AppConstants.api}/yuks/${yuk.slug}`;
      request.method = 'PUT';
      delete yuk.slug;

    } else {
      request.url = `${this._AppConstants.api}/yuks`;
      request.method = 'POST';
    }

    request.data = { yuk: yuk };

    return this._$http(request).then((res) => res.data.yuk);
  }


  like(slug) {
    return this._$http({
      url: this._AppConstants.api + '/yuks/' + slug + '/like',
      method: 'POST'
    })
  }

  unlike(slug) {
    return this._$http({
      url: this._AppConstants.api + '/yuks/' + slug + '/like',
      method: 'DELETE'
    })
  }
  dislike(slug) {
    return this._$http({
      url: this._AppConstants.api + '/yuks/' + slug + '/dislike',
      method: 'POST'
    })
  }

  undislike(slug) {
    return this._$http({
      url: this._AppConstants.api + '/yuks/' + slug + '/dislike',
      method: 'DELETE'
    })
  }


}
