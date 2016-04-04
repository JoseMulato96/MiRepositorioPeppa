'use strict';

describe('Directive: alertasTempranasCreate', function () {

  // load the directive's module and view
  beforeEach(module('pepawebApp'));
  beforeEach(module('app/alertasTempranas/alertasTempranas-create/alertasTempranas-create.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<alertas-tempranas-create></alertas-tempranas-create>');
    element = $compile(element)(scope);
    scope.$apply();
    element.text().should.equal('this is the alertasTempranasCreate directive');
  }));
});
