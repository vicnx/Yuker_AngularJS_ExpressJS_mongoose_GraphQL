class SubscriptionsCtrl {
    constructor($state,$scope,$stateParams) {
      'ngInject';
      console.log("controller subscriptions");
      this.listConfig = {
        type: 'all'
      }
      // this._$scope = $scope;
      // this.subscriptions = subscriptions;
      // $scope.subscriptions = this.subscriptions;
      // console.log(subscriptions)
  
    }
  
  
  }
  
  export default SubscriptionsCtrl;
  