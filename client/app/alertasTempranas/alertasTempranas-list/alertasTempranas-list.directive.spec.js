'use strict';

describe('Directive: alertasTempranasList', function () {

  // load the directive's module and view
  beforeEach(module('pepawebApp'));
  beforeEach(module('app/alertasTempranas/alertasTempranas-list/alertasTempranas-list.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<alertas-tempranas-list></alertas-tempranas-list>');
    element = $compile(element)(scope);
    scope.$apply();
    element.text().should.equal('this is the alertasTempranasList directive');
  }));
});
