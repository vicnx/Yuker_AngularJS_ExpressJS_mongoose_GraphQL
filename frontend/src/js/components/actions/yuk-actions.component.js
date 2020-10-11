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
      //al borrar comprueba si estaba en home o en otro lado. SI ya esta en home recarga la pagina, si no va a home (siempre despues de eliminarlo)
      this.isDeleting = true;
      this._Yuks.deleteYuk(this.yuk.slug).then(
        (success) => this._$state.current.name=="app.home" ? location.reload() : this._$state.go('app.home'),
        (err) =>this._$state.current.name=="app.home" ? location.reload() : this._$state.go('app.home')
        // if(this._$state.current.name=="app.home"){
        //   console.log("reload")
        //   location.reload();
        // }else{
        //   console.log("go home");
        //   this._$state.go('app.home')
        // }
      )
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
  