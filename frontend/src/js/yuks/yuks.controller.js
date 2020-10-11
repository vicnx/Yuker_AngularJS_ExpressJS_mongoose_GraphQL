class ListYuks {
    constructor(yuks,$scope,$state,$stateParams) {
      'ngInject';
      this._$scope = $scope;
      this.yuks = yuks;
      $scope.yuks = this.yuks;
      this.filter = $stateParams.filter;
      //filtro
      var yuksFiltrados = new Array();
      this.yuks.forEach(yuk => {
        // console.log(yuk.tagList)
        if(this.filter){
          this.namefilter="Yuks con el tag: "+this.filter
          if (yuk.tagList.includes(this.filter)) {
            yuksFiltrados.push(yuk);
          }
        }else{
          this.namefilter="Todos los Yuks";
          yuksFiltrados=this.yuks;
        }

      });
      console.log(yuksFiltrados);
      this.yuksFiltrados = yuksFiltrados;

      

  
    }

    // removeFilter(){
    //   console.log($stateParams.filter);
    //   this.filter = false;
    // }
  
    // changeList(newList) {
    //   this._$scope.$broadcast('setListTo', newList);
    // }
  
  
  }
  
  export default ListYuks;
  