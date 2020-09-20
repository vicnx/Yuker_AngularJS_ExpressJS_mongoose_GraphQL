class NoticiasDetailsCtrl {
    // console.log("NoticiasListCtrl");
      constructor($scope, $state){
        "ngInject";
    
        console.log("Controller componente details noticias")
        this._$scope = $scope;
      }
    }

let NoticiasDetail = {
    bindings: {
      noticia: '='
    },
    controller: NoticiasDetailsCtrl,
    templateUrl: 'components/noticias-helpers/noticias-details.html'
  };
  
export default NoticiasDetail;