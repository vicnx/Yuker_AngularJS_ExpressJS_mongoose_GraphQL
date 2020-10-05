function Noticias_EditorConfig($stateProvider) {
  'ngInject';
  console.log("dentro de noticias config editor")
  $stateProvider
  .state('app.noticias_editor', {
    url: '/noticias_editor/:slug',
    controller: 'Noticias_EditorCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'noticias_editor/noticias_editor.html',
    title: 'Noticias Editor',
    resolve:{
      auth: function(User) {
        return User.ensureAuthIs(true);
      },
      noticia: function(Noticias, User, $state, $stateParams) {

        if ($stateParams.slug) {

          return Noticias.get($stateParams.slug).then(
            (noticia) => {
              if (User.current.username === noticia.author.username) {
                return noticia;
              } else {
                $state.go('app.home');
              }
            },
            (err) => $state.go('app.home')
          )

        } else {
          return null;
        }

      }
    }
  });

};

export default Noticias_EditorConfig;
