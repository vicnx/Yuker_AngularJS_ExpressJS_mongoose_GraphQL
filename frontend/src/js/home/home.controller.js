class HomeCtrl {
  // constructor(User, yuks,noticias, yuktags,AppConstants, $state,$scope) {
  constructor(User,noticias, yuktags,AppConstants, $state,$scope) {

    'ngInject';
    // console.log(noticias)
    // console.log("Home controller");
    this.appName = AppConstants.appName;
    this._$scope = $scope;
    // this.yuks = yuks;
    // console.log(this.yuks);
    this.noticias = noticias;
    this.tagsYuks = yuktags;
    // $scope.yuks = this.yuks;
    // console.log(this.yuktags);

    //UTILIZO LAS TAGS COMO CATEGORIAS

    // Tags
    //   .getAllYuksTags()
    //   .then(
    //     (tagsYuks) => {
    //       this.tagsYuksLoaded = true;
    //       this.tagsYuks = tagsYuks
    //     }
    //   );

    //   Tags
    //   .getAllNoticiasTags()
    //   .then(
    //     (tagsNoticias) => {
    //       this.tagsNoticiasLoaded = true;
    //       this.tagsNoticias = tagsNoticias
    //     }
    //   );
      

    // Si no hay user login ponemos el type del list en ALL.
    this.listConfig = {
      type: User.current ? 'feed' : 'all'
    };
    console.log(this.listConfig);

  }

  // functio n para cambiar la lista del home
  changeList(newList) {
    this._$scope.$broadcast('setListTo', newList);
  }


}

export default HomeCtrl;
