class DislikeBtnCtrl {
    constructor(User, Yuks, $state) {
      'ngInject';
  
      this._User = User;
      this._Yuks = Yuks;
      this._$state = $state;
  
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
                // this._Yuks.dislike(this.yuk.slug);
                this.yuk.likesCount--;
                // this.yuk.dislikesCount++;
          
              }
            )
        }

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
      
          }
        )
  
      } else {
        this._Yuks.dislike(this.yuk.slug).then(
          () => {
            this.isSubmitting = false;
            this.yuk.disliked = true;
            this.yuk.dislikesCount++;
          }
        )
      }
  
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
  