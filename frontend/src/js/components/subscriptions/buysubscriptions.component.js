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
    //calculamos la fecha de exp
    var exp_date = new Date();
    exp_date.setMonth(exp_date.getMonth() + 1);

    //creamos el input que se pasara al mute (le pasamos email del usuario actual que despues obtendra su id)
    let sub = {
      type: type,
      user: this._User.current.email,
      finish: exp_date
    };
    this._Subscriptions.mute(sub);

    // console.log(this._User.current.email);
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
