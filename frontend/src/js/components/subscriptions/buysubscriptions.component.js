class BuysubscriptionCtrl {
  constructor(Subscriptions,User,Toastr,$state,) {
    'ngInject';

    this._User=User;
    this._Subscriptions=Subscriptions;
    this._$state = $state;
    this._toaster = Toastr;

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
      user: null,
      finish: exp_date
    };
    this._Subscriptions.post(sub).then(
      (success) =>{
        console.log(success);
        this._toaster.showToastr('success','COMPRADA la subscripción con exito');
        setTimeout(() => {
          this._$state.go('app.home');
        }, 1500); 
      }, 
      (err) =>{
        console.log(err);
        this._toaster.showToastr('error','Error al comprar');
        setTimeout(() => {
          this._$state.go('app.home');
        }, 1500); 
      }
    )

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
