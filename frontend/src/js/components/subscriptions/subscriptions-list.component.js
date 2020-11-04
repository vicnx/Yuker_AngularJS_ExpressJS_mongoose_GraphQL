class SusbcriptionsListCtrl {
  //el Susbcriptions del constructor se refiere al Susbcriptions.service.js
  constructor(Subscriptions,$scope){
    "ngInject";
    // console.log("dentro del yuklistCTRL");
    // console.log(Yuks);
    this._$scope = $scope;
    this._Subscriptions = Subscriptions;

    //ponemos la lista por defecto al cargar
    //usamos un ON INIT para pillar el binding cuando carge (si no haces esto la primera vez que entras no va)
    this.$onInit = () => {
      this.setListTo(this.listConfig);
    }

    // this.setListTo(this.listConfig);
    // console.log(this.listConfig);
    

    $scope.$on('setListTo', (ev, newList) => {
      // console.log(newList);
      this.setListTo(newList);
    });

    $scope.$on('setPageTo', (ev, pageNumber) => {
      this.setPageTo(pageNumber);
    });
  }

  setListTo(newList) {
          // console.log(newList);

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
    console.log("dentro runquery subs");
    // Show the loading indicator
    this.loading = true;
    this.listConfig = this.listConfig || {};
    // console.log(this.listConfig);

    // Create an object for this query
    let queryConfig = {
      type: this.listConfig.type || undefined,
      filters: this.listConfig.filters || {}
    };
    console.log(queryConfig);

    // Set the limit filter from the component's attribute
    queryConfig.filters.limit = this.limit;

    // If there is no page set, set page as 1
    if (!this.listConfig.currentPage) {
      this.listConfig.currentPage = 1;
    }

    // Add the offset filter
    queryConfig.filters.offset = (this.limit * (this.listConfig.currentPage - 1));
    // }

    //miramos si le pasamos el email para añadirle las comillas
    if(queryConfig.filters.email){
      queryConfig.filters.email = '"'+queryConfig.filters.email+'"';
    }
    
    // console.log(queryConfig);
    // Run the query
    this._Subscriptions
      .query(queryConfig)
      .then(
        (res) => {
          this.loading = false;

          // Update list and total pages
          this.list = res.subscriptions;
          // console.log(this.list);
          this.listConfig.totalPages = Math.ceil(res.subscriptionsCount / this.limit);
        }
      );
  }

}
let SubscriptionsList = {
  bindings: {
    limit: '=',
    listConfig: '='
  },
  controller: SusbcriptionsListCtrl,
  templateUrl: 'components/subscriptions/subscriptions-list.html'
};
export default SubscriptionsList;
