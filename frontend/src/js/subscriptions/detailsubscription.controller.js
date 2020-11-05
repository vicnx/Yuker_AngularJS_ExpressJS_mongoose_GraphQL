class DetailsSubscriptionCtrl {
  constructor(User,Subscriptions,subscription,AppConstants, $state,$scope,Toastr) {
    'ngInject';
    console.log("controller detail SUBSCRIPTIONS")
    this._Subscriptions=Subscriptions
    this._$state = $state;
    this._toaster = Toastr;

    this.$onInit = () => {
      
      // console.log(this.subscription);
      this.subscription=subscription.subscription
      console.log(this.subscription);
      console.log(this.subscription.start.toString().split('T')[0]);
      this.subscription.start = this.subscription.start.toString().split('T')[0];
      this.subscription.finish = this.subscription.finish.toString().split('T')[0];

      if(this.subscription.finish == null) this.subscription.finish = "NEVER"
      if(this.subscription.active == true){
        this.badge = "active active--true";
      }else{
        this.badge = "active active--false";
      }

      if (User.current) {
        this.canModify = (User.current.username === this.subscription.user.username);
      } else {
        this.canModify = false;
      }

    }
    
  }

  removeSub(slug) {

    //creamos el input que se pasara al mute (le pasamos email del usuario actual que despues obtendra su id)
    let input = {
      "slug": slug,
    };
    this._Subscriptions.delete(input).then(
      (success) =>{
        this._toaster.showToastr('success','Borrada la subscripción con exito');
        setTimeout(() => {
          this._$state.go('app.home');
        }, 1500); 
      }, 
      (err) =>{
        this._toaster.showToastr('error','Error al borrar');
        setTimeout(() => {
          this._$state.go('app.home');
        }, 1500); 
      }
    )
  }

}

export default DetailsSubscriptionCtrl;
