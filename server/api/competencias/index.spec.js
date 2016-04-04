'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var competenciasCtrlStub = {
  index: 'competenciasCtrl.index',
  show: 'competenciasCtrl.show',
  create: 'competenciasCtrl.create',
  update: 'competenciasCtrl.update',
  destroy: 'competenciasCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var competenciasIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './competencias.controller': competenciasCtrlStub
});

describe('Competencias API Router:', function() {

  it('should return an express router instance', function() {
    competenciasIndex.should.equal(routerStub);
  });

  describe('GET /api/competencias', function() {

    it('should route to competencias.controller.index', function() {
      routerStub.get
        .withArgs('/', 'competenciasCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/competencias/:id', function() {

    it('should route to competencias.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'competenciasCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/competencias', function() {

    it('should route to competencias.controller.create', function() {
      routerStub.post
        .withArgs('/', 'competenciasCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/competencias/:id', function() {

    it('should route to competencias.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'competenciasCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/competencias/:id', function() {

    it('should route to competencias.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'competenciasCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/competencias/:id', function() {

    it('should route to competencias.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'competenciasCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
