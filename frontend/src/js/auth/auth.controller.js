class AuthCtrl {
  constructor(User, $state,Toastr) {
    'ngInject';

    this._toastr = Toastr;

    this._User = User;
    this._$state = $state;

    this.title = $state.current.title;
    this.authType = $state.current.name.replace('app.', '');

  }

  submitForm() {
    this.isSubmitting = true;
    this._User.attemptAuth(this.authType, this.formData).then(
      (res) => {
        this._toastr.showToastr("success", "Login");
        setTimeout(() => {
          this._$state.go('app.home');
        }, 1500);
        
      },
      (err) => {
        this.isSubmitting = false;
        this._toastr.showToastr("error", "Login Fail");
        this.errors = err.data.errors;
      }
    )
  }

}

export default AuthCtrl;
