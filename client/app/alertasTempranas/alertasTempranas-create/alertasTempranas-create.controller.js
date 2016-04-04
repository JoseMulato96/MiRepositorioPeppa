(function () {
  'use strict';

  angular.module('pepawebApp')
    .controller('AlertasTempranasCreateCtrl', AlertasTempranasCreateCtrl);

AlertasTempranasCreateCtrl.$inject = [AlertasTempranas];

    function AlertasTempranasCreateCtrl(AlertasTempranas) {
this.create = function(){
  AlertasTempranas.save(this.alertastempranas,function(){
    $location.path('/alertastempranas');
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Reporte Satisfactorio')
                        .position('bottom right'));

 });
 }
}

})();
