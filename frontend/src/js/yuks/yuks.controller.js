class ListYuks {
    constructor(yuks,$scope) {
      'ngInject';
      this._$scope = $scope;
      this.yuks = yuks;
      $scope.yuks = this.yuks;
      // Set current list to either feed or all, depending on auth status.
      // this.listConfig = {
      //   type: User.current ? 'feed' : 'all'
      // };
  
    }
  
    // changeList(newList) {
    //   this._$scope.$broadcast('setListTo', newList);
    // }
  
  
  }
  
  export default ListYuks;
  