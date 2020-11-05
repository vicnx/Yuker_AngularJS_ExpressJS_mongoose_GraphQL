class DetailsSubscriptionCtrl {
  constructor(Subscriptions,subscription,AppConstants, $state,$scope) {
    'ngInject';
    console.log("controller detail SUBSCRIPTIONS")
    this._Subscriptions=Subscriptions
    this.$onInit = () => {
      
      // console.log(this.subscription);
      this.subscription=subscription.subscription
      console.log(this.subscription);
      console.log(this.subscription.start.toString().split('T')[0]);
      this.subscription.start = this.subscription.start.toString().split('T')[0];
      this.subscription.finish = this.subscription.finish.toString().split('T')[0];

      if(this.subscription.finish == null) this.subscription.finish = "NEVER"
      if(this.subscription.active == true){
        this.badge = "active active--true"
      }else{
        this.badge = "active active--false"
      }

    }
    
  }

  removeSub(slug) {

    //creamos el input que se pasara al mute (le pasamos email del usuario actual que despues obtendra su id)
    let input = {
      "slug": slug,
    };
    this._Subscriptions.delete(input);
  }

}

export default DetailsSubscriptionCtrl;
