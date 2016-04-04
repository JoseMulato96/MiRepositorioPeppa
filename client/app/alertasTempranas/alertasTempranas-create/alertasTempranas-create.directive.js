(function () {
  'use strict';

  angular.module('pepawebApp')
    .directive('alertastempranascreate',alertasTempranasCreate);

function alertasTempranasCreate() {
  return {
    templateUrl: 'app/alertasTempranas/alertasTempranas-create/alertasTempranas-create.html',
    restrict: 'EA',
    controller:'AlertasTempranasCreateCtrl',
    controllerAs:'vm',
    link: function (scope, element, attrs) {
    }
  };
}

  })();
