function Yuk_EditorConfig($stateProvider) {
  'ngInject';
console.log("dentro de yuk_editor config")
  $stateProvider
  .state('app.yuk_editor', {
    url: '/yuk_editor/:slug',
    controller: 'Yuk_EditorCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'yuk_editor/yuk_editor.html',
    title: 'Yuk Editor',
    resolve:{
      auth: function(User) {
        return User.ensureAuthIs(true);
      },
      yuk: function(Yuks, User, $state, $stateParams) {

        if ($stateParams.slug) {

          return Yuks.get($stateParams.slug).then(
            (yuk) => {
              if (User.current.username === yuk.author.username) {
                return yuk;
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

export default Yuk_EditorConfig;
