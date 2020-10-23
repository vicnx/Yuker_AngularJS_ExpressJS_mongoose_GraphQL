class NoticiasCtrl {
    constructor(noticias, $state,$scope,$stateParams) {
      'ngInject';
      console.log("controller noticias")
      this._$scope = $scope;
      this.noticias = noticias;
      $scope.noticias = this.noticias;
      console.log(noticias)
  
    }
  
  
  }
  
  export default NoticiasCtrl;
  