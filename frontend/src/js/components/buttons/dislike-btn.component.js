class DislikeBtnCtrl {
    constructor(User, Yuks, $state,$rootScope) {
      'ngInject';
  
      this._User = User;
      this._Yuks = Yuks;
      this._$state = $state;
      this._$rootScope = $rootScope;
  
    }
  
    submit() {
   
      this.isSubmitting = true;
        console.log("disLike component")
        console.log(this.yuk)

        if(this.yuk.liked){
          this._Yuks.unlike(this.yuk.slug).then(
              () => {
                console.log("estaba liked y le quitamos el like")
                this.isSubmitting = false;
                this.yuk.liked = false;
                this.yuk.likesCount--;
                //actualizamos el Karma
                this._$rootScope.setKarma();

                //damos dislike
                this._Yuks.dislike(this.yuk.slug).then(
                  () => {
                    this.isSubmitting = false;
                    this.yuk.disliked = true;
                    this.yuk.dislikesCount++;
                    //actualizamos el Karma
                    this._$rootScope.setKarma();

                    
                  }
                )
                // this._$rootScope.setKarma();
          
              }
            )
        }else{
          if (!this._User.current) {
            this._$state.go('app.login'); //redirigimos a login si no hay usuario logeado
            return;
          }
          if (this.yuk.disliked) {
            this._Yuks.undislike(this.yuk.slug).then(
              () => {
                this.isSubmitting = false;
                this.yuk.disliked = false;
                this.yuk.dislikesCount--;
                //actualizamos el Karma
                this._$rootScope.setKarma();
          
              }
            )
      
          } else {
            this._Yuks.dislike(this.yuk.slug).then(
              () => {
                this.isSubmitting = false;
                this.yuk.disliked = true;
                this.yuk.dislikesCount++;
                //actualizamos el Karma
                this._$rootScope.setKarma();
              }
            )
          }
        }
        // this._$rootScope.setKarma();
    }
  
  }
  
  let DislikeBtn= {
    bindings: {
      yuk: '='
    },
    transclude: true,
    controller: DislikeBtnCtrl,
    templateUrl: 'components/buttons/dislike-btn.html'
  };
  
  export default DislikeBtn;
  