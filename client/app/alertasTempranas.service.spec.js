'use strict';

describe('Service: alertasTempranas', function () {

  // load the service's module
  beforeEach(module('pepawebApp'));

  // instantiate service
  var alertasTempranas;
  beforeEach(inject(function (_alertasTempranas_) {
    alertasTempranas = _alertasTempranas_;
  }));

  it('should do something', function () {
    !!alertasTempranas.should.be.true;
  });

});
