class SocialCtrl {
    // constructor(User, $state, $scope, Toastr) {
      constructor(User, $state, $scope, Toastr) {
      'ngInject';
 
      this._User = User;
      this._$state = $state;
      this._$scope = $scope;
      this._toaster = Toastr;
      // this._toaster = Toastr;
  
      this.title = $state.current.title;
      this.authType = $state.current.name.replace('app.', '');
      this._User.attemptAuth(this.authType, null).then(
        (res) => {
          console.log("success login")
          this._toaster.showToastr('success','Login');
          setTimeout(() => {
            location.reload();
            this._$state.go('app.home');
          }, 1500);
        },
        (err) => {
          console.log(err);
          this._toaster.showToastr('error','No login');
          setTimeout(() => {
            this._$state.go('app.home');
          }, 1500); 
        }
      )
    }
  }
  export default SocialCtrl;