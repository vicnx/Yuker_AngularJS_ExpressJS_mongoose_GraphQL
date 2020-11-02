class BuySubscriptionsCtrl {
    constructor($state,$scope) {
      'ngInject';
      

      this.$onInit = () => {
        // console.log(this.yuk.author.username)
        this.type=this.type
        // if (User.current) {
        //   this.type = (User.current.username === this.yuk.author.username);
        // } else {
        //   this.canModify = false;
        // }
      }
      // if (User.current) {
      //   this.canModify = (User.current.username === this.yuk.author.username);
      // } else {
      //   this.canModify = false;
      // }
  
    }
  }
let BuySubscriptions = {
    bindings: {
      type: '='
    },
    templateUrl: 'components/subscriptions/buysubscriptions.html'
  };
  
  export default BuySubscriptions;
  