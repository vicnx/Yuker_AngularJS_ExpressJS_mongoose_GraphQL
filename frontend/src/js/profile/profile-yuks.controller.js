class ProfileYuksCtrl {
  constructor(profile, $state, $rootScope) {
    'ngInject';

    console.log(profile);
    // The profile for this page, resolved by UI Router
    this.profile = profile;

    this.profileState = $state.current.name.replace('app.profile.', '');

    // Both favorites and author Yuks require the 'all' type
    this.listConfig = { type: 'all' };

    // `main` state's filter should be by author
    if (this.profileState === 'main') {
      this.listConfig.filters = {author: this.profile.username};
      // Set page title
      $rootScope.setPageTitle('@' + this.profile.username);

      //aquis acamos los yuks que ha dado like ese usuario
    } else if (this.profileState === 'likes') {
      this.listConfig.filters = {liked: this.profile.username};
      // Set page title
      $rootScope.setPageTitle(`Yuks Liked by ${this.profile.username}`);
      
    } else if(this.profileState === 'dislikes'){
      this.listConfig.filters = {disliked: this.profile.username};
      // Set page title
      $rootScope.setPageTitle(`Yuks DisLiked by ${this.profile.username}`);
    }else if(this.profileState === 'subscriptions'){
      this.listConfig.filters = {email: this.profile.email};
      $rootScope.setPageTitle(`SUBS ${this.profile.username}`);
    }

  }
}

export default ProfileYuksCtrl;
