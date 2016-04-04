(function () {
  'use strict';

  angular.module('pepawebApp')
    .directive('alertastempranaslist', alertasTempranasList);


 function alertasTempranasList() {
   return {
     templateUrl: 'app/alertasTempranas/alertasTempranas-list/alertasTempranas-list.html',
     restrict: 'EA',
     controller:'AlertasTempranasListCtrl',
     controllerAs:'vm',
     link: function (scope, element, attrs) {
     }
 };
 }

})();
