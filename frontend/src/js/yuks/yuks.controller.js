class ListYuks {
    constructor(yuks,$scope,$state,$stateParams) {
      'ngInject';
      this._$scope = $scope;
      this.yuks = yuks;
      $scope.yuks = this.yuks;
      this.filter = $stateParams.filter;
      console.log
      //filtro
      var yuksFiltrados = new Array();
      this.yuks.forEach(yuk => {
        // console.log(yuk.tagList)
        if(this.filter){
          this.namefilter="Yuks con el tag: "+this.filter
          console.log(this.filter)
          if (yuk.tagList.includes(this.filter)) {
            console.log(yuk)
            yuksFiltrados.push(yuk);
          }
        }else{
          this.namefilter="Todos los Yuks";
          console.log("sin filtro")
          yuksFiltrados=this.yuks;
        }

      });
      console.log(yuksFiltrados);
      this.yuksFiltrados = yuksFiltrados;

  
    }
  
    // changeList(newList) {
    //   this._$scope.$broadcast('setListTo', newList);
    // }
  
  
  }
  
  export default ListYuks;
  