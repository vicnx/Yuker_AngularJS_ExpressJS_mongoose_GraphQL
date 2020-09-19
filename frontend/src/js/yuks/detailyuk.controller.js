class DetailYukCtrl {
  constructor(User, yuk,Tags,AppConstants, $state,$scope) {

  // constructor(User, Tags, AppConstants, $scope) {
    'ngInject';
    console.log(yuk)
    console.log("Yuks controller");
    this.appName = AppConstants.appName;
    this._$scope = $scope;
    this.yuk = yuk;
    $scope.yuk = this.yuk;
    

  }


}

export default DetailYukCtrl;
