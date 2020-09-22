class AuthCtrl {
  constructor(User, $state) {
    'ngInject';

    this._User = User;
    this._$state = $state;

    this.title = $state.current.title;
    this.authType = $state.current.name.replace('app.', '');

  }

  submitForm() {
    this.isSubmitting = true;
    this._User.attemptAuth(this.authType, this.formData).then(
      (res) => {
        if(res.data=="errors"){
          console.log("error");
          //Si el user/email ya existix
          // this._$state.go('app.register');
        }else{
          this._$state.go('app.home');
        }
        
      },
      // (err) => {
      //   this.isSubmitting = false;
      //   this.errors = err.data.errors;
      // }
    )
  }
}

export default AuthCtrl;
