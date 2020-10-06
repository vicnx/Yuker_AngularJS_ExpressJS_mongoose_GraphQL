function YuksConfig($stateProvider) {
  'ngInject';
console.log("yuks.config")
  $stateProvider
  .state('app.detailyuk', {
    url: '/yuks/:slug',
    controller: 'DetailYukCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'yuks/detailyuk.html',
    title: 'Details Yuks',
    resolve: {
      yuk: function(Yuks, $stateParams) {
        console.log("Resolve del yuk");
        return Yuks.get($stateParams.slug).then(yuk => yuk);
      }
    }
  }).state("app.listaryuks", {
    url: "/allyuks/:filter",
    controller: "ListYuks",
    controllerAs: "$ctrl",
    templateUrl: "yuks/yuks.html",
    title: "Listar Yuks",
    resolve: {
      yuks: function(Yuks) {
        return Yuks.getAllYuks().then(
          (yuks) => yuks
        )
      },
    }
  })
  
};

export default YuksConfig;
