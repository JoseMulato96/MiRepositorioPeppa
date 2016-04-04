

'use strict';

angular.module('pepawebApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('alertasTempranas', {
        url: '/alertasTempranas',
        template: '<alertastempranaslist></alertastempranaslist>'
      })
      .state('alertasTempranas-create', {
        url: '/alertasTempranas/new',
        template: '<alertastempranascreate></alertastempranascreate>'
      });
});
