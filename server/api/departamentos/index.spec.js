'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var departamentosCtrlStub = {
  index: 'departamentosCtrl.index',
  show: 'departamentosCtrl.show',
  create: 'departamentosCtrl.create',
  update: 'departamentosCtrl.update',
  destroy: 'departamentosCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var departamentosIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './departamentos.controller': departamentosCtrlStub
});

describe('Departamentos API Router:', function() {

  it('should return an express router instance', function() {
    departamentosIndex.should.equal(routerStub);
  });

  describe('GET /api/departamentos', function() {

    it('should route to departamentos.controller.index', function() {
      routerStub.get
        .withArgs('/', 'departamentosCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/departamentos/:id', function() {

    it('should route to departamentos.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'departamentosCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/departamentos', function() {

    it('should route to departamentos.controller.create', function() {
      routerStub.post
        .withArgs('/', 'departamentosCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/departamentos/:id', function() {

    it('should route to departamentos.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'departamentosCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/departamentos/:id', function() {

    it('should route to departamentos.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'departamentosCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/departamentos/:id', function() {

    it('should route to departamentos.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'departamentosCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
