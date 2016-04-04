(function(){
  'use strict';



angular.module('pepawebApp')
  .factory('alertasTempranas', alertasTempranas);

alertasTempranas.$inject = ['$resource'];

function alertasTempranas($resource) {
  return $resource('/api/inasistencias_aprendiz/:id_inasistencias',
  {id_inasistencias: '@id_inasistencias'},
  {
    'update' : {method: 'PUT'}
  });
}

})();
