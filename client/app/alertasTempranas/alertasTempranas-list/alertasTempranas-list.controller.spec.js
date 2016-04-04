'use strict';

describe('Controller: AlertasTempranasListCtrl', function () {

  // load the controller's module
  beforeEach(module('pepawebApp'));

  var AlertasTempranasListCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AlertasTempranasListCtrl = $controller('AlertasTempranasListCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
