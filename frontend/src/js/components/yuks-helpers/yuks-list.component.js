class YuksListCtrl {
  constructor($scope, $state){
    "ngInject";
    this._$scope = $scope;
  }
}
let YuksList = {
  bindings: {
    yuks: '='
  },
  controller: YuksListCtrl,
  templateUrl: 'components/yuks-helpers/yuks-list.html'
};
export default YuksList;
