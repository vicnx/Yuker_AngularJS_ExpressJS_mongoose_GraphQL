class YukActionsCtrl {
    constructor(Yuks, User, $state,$scope) {
      'ngInject';
      
      this._Yuks = Yuks;
      this._$state = $state;
      

      this.$onInit = () => {
        console.log(this.yuk.author.username)
        if (User.current) {
          this.canModify = (User.current.username === this.yuk.author.username);
        } else {
          this.canModify = false;
        }
      }
      // if (User.current) {
      //   this.canModify = (User.current.username === this.yuk.author.username);
      // } else {
      //   this.canModify = false;
      // }
  
    }
  
    deleteYuk() {
      this.isDeleting = true;
      this._Yuks.deleteYuk(this.yuk.slug).then(
        console.log(this._$state.current),
        this._$state.go('app.home'),
      ).then()
    }
  }
  
  let YukActions = {
    bindings: {
      yuk: '='
    },
    controller: YukActionsCtrl,
    templateUrl: 'components/actions/yuk-actions.html'
  };
  
  export default YukActions;
  