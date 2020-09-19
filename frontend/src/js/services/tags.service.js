export default class Tags {
  
  constructor(JWT, AppConstants, $http, $q) {
    'ngInject';
    console.log("tag service");
    this._AppConstants = AppConstants;
    this._$http = $http;


  }

  getAll() {
    return this._$http({
      url: this._AppConstants.api + '/tags',
      method: 'GET',
    }).then(console.log(tags),(res) => res.data.tags);

  }
  getAllTags(){
    return this._$http({
      url: this._AppConstants.api + "/tags",
      method: "GET"
    }).then(res => {
      return res.data.tags;
    });
  }


}
