'use strict';

describe('Controller: AlertasTempranasCreateCtrl', function () {

  // load the controller's module
  beforeEach(module('pepawebApp'));

  var AlertasTempranasCreateCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AlertasTempranasCreateCtrl = $controller('AlertasTempranasCreateCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    1.should.equal(1);
  });
});
