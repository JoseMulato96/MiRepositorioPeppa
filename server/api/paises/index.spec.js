'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var paisesCtrlStub = {
  index: 'paisesCtrl.index',
  show: 'paisesCtrl.show',
  create: 'paisesCtrl.create',
  update: 'paisesCtrl.update',
  destroy: 'paisesCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var paisesIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './paises.controller': paisesCtrlStub
});

describe('Paises API Router:', function() {

  it('should return an express router instance', function() {
    paisesIndex.should.equal(routerStub);
  });

  describe('GET /api/paises', function() {

    it('should route to paises.controller.index', function() {
      routerStub.get
        .withArgs('/', 'paisesCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/paises/:id', function() {

    it('should route to paises.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'paisesCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/paises', function() {

    it('should route to paises.controller.create', function() {
      routerStub.post
        .withArgs('/', 'paisesCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/paises/:id', function() {

    it('should route to paises.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'paisesCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/paises/:id', function() {

    it('should route to paises.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'paisesCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/paises/:id', function() {

    it('should route to paises.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'paisesCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
