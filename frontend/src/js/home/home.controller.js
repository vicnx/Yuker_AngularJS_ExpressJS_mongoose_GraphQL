class HomeCtrl {
  constructor(User, yuks,Tags,AppConstants, $state,$scope) {

  // constructor(User, Tags, AppConstants, $scope) {
    'ngInject';
    console.log(yuks)
    console.log("Home controller");
    this.appName = AppConstants.appName;
    this._$scope = $scope;
    this.yuks = yuks;
    $scope.yuks = this.yuks;
    // Get list of all tags
    Tags
      .getAllTags()
      .then(
        (tags) => {
          this.tagsLoaded = true;
          this.tags = tags
        }
      );

    // Set current list to either feed or all, depending on auth status.
    this.listConfig = {
      type: User.current ? 'feed' : 'all'
    };

  }

  changeList(newList) {
    this._$scope.$broadcast('setListTo', newList);
  }


}

export default HomeCtrl;
