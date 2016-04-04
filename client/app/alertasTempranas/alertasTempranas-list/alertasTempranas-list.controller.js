(function() {

'use strict';

angular.module('pepawebApp')
  .controller('AlertasTempranasListCtrl', AlertasTempranasListCtrl);

AlertasTempranasListCtrl.$inject = ['alertasTempranas'];

  function AlertasTempranasListCtrl(alertasTempranas) {
    this.alertastempranas = alertasTempranas.query();

  }
})();
