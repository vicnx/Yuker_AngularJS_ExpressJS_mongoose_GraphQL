function NoticiasConfig($stateProvider) {
  'ngInject';
console.log("noticias.config")
  $stateProvider
.state("app.listarnoticias", {
    url: "/allnoticias",
    controller: "NoticiasCtrl",
    controllerAs: "$ctrl",
    templateUrl: "noticias/noticias.html",
    title: "Listar Noticias",
    resolve: {
      noticias: function(Noticias) {
        return Noticias.getAllNoticias().then(
          console.log("Resolve de list noticia"),
          (noticias) => noticias,
          
        )
      },
    }
  }) 
  .state('app.detailnoticia', {
    url: '/noticias/:slug',
    controller: 'DetailNoticiaCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'noticias/detailnoticia.html',
    title: 'Details Noticias',
    resolve: {
      noticia: function(Noticias, $stateParams) {
        return Noticias.get($stateParams.slug).then(noticia => noticia);
      }
    }
  })
  
};

export default NoticiasConfig;
