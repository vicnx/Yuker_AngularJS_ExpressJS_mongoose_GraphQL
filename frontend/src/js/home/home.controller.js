class HomeCtrl {
  constructor(User, yuks,noticias, Tags,AppConstants, $state,$scope) {
    'ngInject';
    console.log(noticias)
    console.log("Home controller");
    this.appName = AppConstants.appName;
    this._$scope = $scope;
    this.yuks = yuks;
    console.log(this.yuks);
    this.noticias = noticias;
    $scope.yuks = this.yuks;
    // Get list of all tags
    Tags
      .getAllYuksTags()
      .then(
        (tagsYuks) => {
          this.tagsYuksLoaded = true;
          this.tagsYuks = tagsYuks
        }
      );

      Tags
      .getAllNoticiasTags()
      .then(
        (tagsNoticias) => {
          this.tagsNoticiasLoaded = true;
          this.tagsNoticias = tagsNoticias
        }
      );
      

    // Set current list to either feed or all, depending on auth status.
    // this.listConfig = {
    //   type: User.current ? 'feed' : 'all'
    // };

  }

  // changeList(newList) {
  //   this._$scope.$broadcast('setListTo', newList);
  // }


}

export default HomeCtrl;
