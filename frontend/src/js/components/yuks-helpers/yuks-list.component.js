class YuksListCtrl {
  //el Yuks del constructor se refiere al yuks.service.js
  constructor(Yuks,$scope){
    "ngInject";
    // console.log("dentro del yuklistCTRL");
    // console.log(Yuks);
    this._$scope = $scope;
    this._Yuks = Yuks;

    //ponemos la lista por defecto al cargar
    //usamos un ON INIT para pillar el binding cuando carge (si no haces esto la primera vez que entras no va)
    this.$onInit = () => {
      this.setListTo(this.listConfig);
    }
    // console.log(this.listConfig);
    

    $scope.$on('setListTo', (ev, newList) => {
      this.setListTo(newList);
    });

    $scope.$on('setPageTo', (ev, pageNumber) => {
      this.setPageTo(pageNumber);
    });
  }

  setListTo(newList) {
    // Set the current list to an empty array
    this.list = [];

    // Set listConfig to the new list's config
    this.listConfig = newList;

    this.runQuery();
  }

  setPageTo(pageNumber) {
    this.listConfig.currentPage = pageNumber;

    this.runQuery();
  }

  runQuery() {
    console.log("dentro runquery");
    // Show the loading indicator
    this.loading = true;
    this.listConfig = this.listConfig || {};
    console.log(this.listConfig);

    // Create an object for this query
    let queryConfig = {
      type: this.listConfig.type || undefined,
      filters: this.listConfig.filters || {}
    };

    // Set the limit filter from the component's attribute
    queryConfig.filters.limit = this.limit;

    // If there is no page set, set page as 1
    if (!this.listConfig.currentPage) {
      this.listConfig.currentPage = 1;
    }

    // Add the offset filter
    queryConfig.filters.offset = (this.limit * (this.listConfig.currentPage - 1));


    //fail xd
    // if(this.listConfig.category){
    //   if(this.listConfig.category != "all"){
    //     console.log("dentro del ig not all");
    //     var yuksFiltrados = new Array();
    //     console.log(res.yuks);
    //     res.yuks.forEach(yuk => {
    //       // console.log(yuk.tagList)
    //         // this.namefilter="Yuks con el tag: "+this.filter
    //       if (yuk.tagList.includes(this.listConfig.category)) {
    //         console.log(yuk);
    //         yuksFiltrados.push(yuk);
    //       }
    //     });
    //     console.log(yuksFiltrados);
    //     this.list=yuksFiltrados;
    //     this.listConfig.totalPages = Math.ceil(yuksFiltrados.length / this.limit);
        
    //   }
    // }

    // Run the query
    this._Yuks
      .query(queryConfig)
      .then(
        (res) => {
          this.loading = false;

          // Update list and total pages
          this.list = res.yuks;
          this.listConfig.totalPages = Math.ceil(res.yuksCount / this.limit);
        }
      );
  }

}
let YuksList = {
  bindings: {
    limit: '=',
    listConfig: '='
  },
  controller: YuksListCtrl,
  templateUrl: 'components/yuks-helpers/yuks-list.html'
};
export default YuksList;
