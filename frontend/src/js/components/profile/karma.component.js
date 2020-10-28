class KarmaCtrl {
    constructor(Profile, User, $state, $scope,$rootScope,AppConstants, $http) {
      'ngInject';
      this._AppConstants = AppConstants;
      this._$http = $http;
      //primero pintamos el Karma
      this.$onInit = () => {
        this.karma=this.user.karma;
      }
      //con rootScope pintamos el karma nuevo siempre que se actualize (cuando das like/dislike) va al server y recoje el nuevo Karma
      $rootScope.setKarma = () => {
        console.log("dentro de setKarma");
        this._$http({
          url: this._AppConstants.api + '/profiles/' + this.user.username,
          method: 'GET'
        }).then((res) => {
          // console.log(res.data.profile);
          this.karma=res.data.profile.karma
        });
      };

    }
}

  
  let Karma= {
    bindings: {
      user: '='
    },
    controller: KarmaCtrl,
    templateUrl: 'components/profile/karma.html'
  };
  
  export default Karma;
  