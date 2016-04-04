'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var epsCtrlStub = {
  index: 'epsCtrl.index',
  show: 'epsCtrl.show',
  create: 'epsCtrl.create',
  update: 'epsCtrl.update',
  destroy: 'epsCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var epsIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './eps.controller': epsCtrlStub
});

describe('Eps API Router:', function() {

  it('should return an express router instance', function() {
    epsIndex.should.equal(routerStub);
  });

  describe('GET /api/eps', function() {

    it('should route to eps.controller.index', function() {
      routerStub.get
        .withArgs('/', 'epsCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/eps/:id', function() {

    it('should route to eps.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'epsCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/eps', function() {

    it('should route to eps.controller.create', function() {
      routerStub.post
        .withArgs('/', 'epsCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/eps/:id', function() {

    it('should route to eps.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'epsCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/eps/:id', function() {

    it('should route to eps.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'epsCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/eps/:id', function() {

    it('should route to eps.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'epsCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
