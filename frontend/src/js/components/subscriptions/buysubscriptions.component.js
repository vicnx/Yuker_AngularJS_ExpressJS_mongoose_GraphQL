class BuysubscriptionCtrl {
  constructor(User) {
    'ngInject';

    this._User=User;

    this.$onInit = () => {
      this.type=this.tipo;
    }

  }

  buySub(type) {
    console.log(this._User.current);
    console.log(type);
  }

}


let BuySubscription= {
  bindings: {
    tipo: '='
  },
  controller: BuysubscriptionCtrl,
  templateUrl: 'components/subscriptions/buysubscriptions.html'
};

export default BuySubscription;
