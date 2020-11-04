function ProfileConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.profile', {
    abstract: true,
    url: '/@:username',
    controller: 'ProfileCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'profile/profile.html',
    resolve: {
      profile: function(Profile, $state, $stateParams) {
        return Profile.get($stateParams.username).then(
          (profile) => profile,
          (err) => $state.go('app.home')
        )
      }
    }

  })

  .state('app.profile.main', {
    url:'',
    controller: 'ProfileYuksCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'profile/profile-yuks.html',
    title: 'Profile'
  })
  .state('app.profile.likes', {
    url:'/likes',
    controller: 'ProfileYuksCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'profile/profile-yuks.html',
    title: 'likes'
  }).state('app.profile.dislikes', {
    url:'/dislikes',
    controller: 'ProfileYuksCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'profile/profile-yuks.html',
    title: 'dislikes'
  }).state('app.profile.subscriptions', {
    url:'/user_subs',
    controller: 'ProfileYuksCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'profile/profile_subs.html',
    title: 'User Subs'
  })

};

export default ProfileConfig;
