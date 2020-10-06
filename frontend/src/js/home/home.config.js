function HomeConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.home', {
    url: '/',
    controller: 'HomeCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'home/home.html',
    title: 'Home',
    resolve: {
      yuks: function(Yuks) {
        return Yuks.getAllYuks().then(
          (yuks) => yuks
        )
      },
      noticias: function(Noticias) {
        return Noticias.getAllNoticias().then(
          (noticias) => noticias
        )
      },
      yuktags: function(Tags) {
        return Tags.getAllYuksTags().then(
          (yuktags) => yuktags
        )
      },
    }
  });
  

};

export default HomeConfig;
