class DetailsSubscriptionCtrl {
  constructor(subscription,AppConstants, $state,$scope) {
    'ngInject';
    console.log("controller detail SUBSCRIPTIONS")

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

}

export default DetailsSubscriptionCtrl;
