function AppRun(AppConstants, $rootScope) {
  'ngInject';

  // change page title based on state
  $rootScope.$on('$stateChangeSuccess', (event, toState) => {
    $rootScope.setPageTitle(toState.title);
  });

  // Helper method for setting the page's title
  $rootScope.setPageTitle = (title) => {
    $rootScope.pageTitle = '';
    if (title) {
      $rootScope.pageTitle += title;
      $rootScope.pageTitle += ' \u2014 ';
    }
    $rootScope.pageTitle += AppConstants.appName;
  };

  // $rootScope.setKarma = () => {
  //   console.log("dentro de rootScrope set karma");
  //   console.log(this.yuk.author);
  //   $rootScope.karma = 10000000;
  //   // $rootScope.pageTitle = '';
  //   // if (title) {
  //   //   $rootScope.pageTitle += title;
  //   //   $rootScope.pageTitle += ' \u2014 ';
  //   // }
  //   // $rootScope.pageTitle += AppConstants.appName;
  // };

}

export default AppRun;
