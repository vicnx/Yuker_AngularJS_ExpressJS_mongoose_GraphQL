class KarmaCtrl {
    constructor(Profile, User, $state, $scope) {
      'ngInject';
      //primero pintamos el Karma
    this.$onInit = () => {
        this.karma=this.user.karma;
    }

    //dejamos un on a la espera (cuando actualize el karma actuializa lo pintado xd)
    $scope.$on('setKarma', (ev, user) => {
        this.setKarmaTo(user.karma)
        // this.karma = user.karma;
    });
      this._Profile = Profile;
      this._User = User;
  
      this._$state = $state;
    }
    setKarmaTo(karma) {
        console.log("PENE");
        this.karma=karma;
    };
}

  
  let Karma= {
    bindings: {
      user: '='
    },
    controller: KarmaCtrl,
    templateUrl: 'components/profile/karma.html'
  };
  
  export default Karma;
  