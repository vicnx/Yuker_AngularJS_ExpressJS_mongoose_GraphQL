function AuthConfig($stateProvider, $httpProvider) {
  'ngInject';

  $stateProvider

  .state('app.login', {
    url: '/login',
    controller: 'AuthCtrl as $ctrl',
    templateUrl: 'auth/auth.html',
    title: 'Sign in',
    resolve: {
      auth: function(User) {
        console.log(User);
        return User.ensureAuthIs(false);
      }
    }
  })

  .state('app.register', {
    url: '/register',
    controller: 'AuthCtrl as $ctrl',
    templateUrl: 'auth/auth.html',
    title: 'Sign up',
    resolve: {
      auth: function(User) {
        console.log(User);
        return User.ensureAuthIs(false);
      }
    }
  })

  .state('app.sociallogin', {
    url: '/auth/sociallogin',
    controller: 'SocialCtrl as $ctrl',
    title: 'Sign up by Social login',
     resolve: {
       auth: function(User) {
         return User.ensureAuthIs(false);
       }
     }
  });

};

export default AuthConfig;
