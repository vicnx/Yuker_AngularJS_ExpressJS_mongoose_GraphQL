class YuksDetailsCtrl {
    // console.log("YuksListCtrl");
      constructor($scope, $state){
        "ngInject";
        this._$scope = $scope;
      }
    }

let YuksDetail = {
    bindings: {
      yuk: '='
    },
    controller: YuksDetailsCtrl,
    templateUrl: 'components/yuks-helpers/yuks-details.html'
  };
  
export default YuksDetail;