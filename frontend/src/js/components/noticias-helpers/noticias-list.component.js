class NoticiasListCtrl {
// console.log("NoticiasListCtrl");
  constructor($scope, $state){
    "ngInject";

    console.log("Controller componente list noticias")
    this._$scope = $scope;
  }
}




let NoticiasList = {
  bindings: {
    noticias: '='
  },
  controller: NoticiasListCtrl,
  templateUrl: 'components/noticias-helpers/noticias-list.html'
};
export default NoticiasList;
