class BuysubscriptionCtrl {
  constructor(Subscriptions,User) {
    'ngInject';

    this._User=User;
    this._Subscriptions=Subscriptions

    this.$onInit = () => {
      this.type=this.tipo;
      console.log(this._User.current);

    }

  }

  buySub(type) {
    //creamos el input que se pasara al mute
    let sub = {
      type: type,
      user: "5fa05d718dd011ad32f43f2b"
    };

    this._Subscriptions.mute(sub);

    console.log(this._User.current);
    // console.log(type);
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
