export default class Noticias {
  constructor(AppConstants, $http, $q) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;
    this._$q = $q;


  }

  getAllNoticias(){
    return this._$http({
      url: this._AppConstants.api + "/noticias/",
      method: "GET"
    }).then(res => {
      return res.data.noticias;
    });
  }
  query(config) {
    console.log(config);
    // Create the $http object for this request
    let request = {
      url: this._AppConstants.api + '/noticias' + ((config.type === 'feed') ? '/feed' : ''),
      method: 'GET',
      params: config.filters ? config.filters : null
    };
    return this._$http(request).then((res) => res.data);
  }

  get(slug) {
    let deferred = this._$q.defer();

    if (!slug.replace(" ", "")) {
      deferred.reject("Noticia slug is empty");
      return deferred.promise;
    }

    this._$http({
      url: this._AppConstants.api + '/noticias/' + slug,
      method: 'GET'
    }).then(
      (res) => deferred.resolve(res.data.noticia),
      (err) => deferred.reject(err)
    );

    return deferred.promise;
  }

  deleteNoticia(slug) {
    return this._$http({
      url: this._AppConstants.api + '/noticias/' + slug,
      method: 'DELETE'
    })
  }

  save(noticia) {
    let request = {};

    if (noticia.slug) {
      request.url = `${this._AppConstants.api}/noticias/${noticia.slug}`;
      request.method = 'PUT';
      delete noticia.slug;

    } else {
      request.url = `${this._AppConstants.api}/noticias`;
      request.method = 'POST';
    }

    request.data = { noticia: noticia };

    return this._$http(request).then((res) => res.data.noticia);
  }


  like(slug) {
    return this._$http({
      url: this._AppConstants.api + '/noticias/' + slug + '/like',
      method: 'POST'
    })
  }

  unlike(slug) {
    return this._$http({
      url: this._AppConstants.api + '/noticias/' + slug + '/like',
      method: 'DELETE'
    })
  }


}
