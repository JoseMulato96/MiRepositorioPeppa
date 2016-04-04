'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var tiposEvidenciasCtrlStub = {
  index: 'tiposEvidenciasCtrl.index',
  show: 'tiposEvidenciasCtrl.show',
  create: 'tiposEvidenciasCtrl.create',
  update: 'tiposEvidenciasCtrl.update',
  destroy: 'tiposEvidenciasCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var tiposEvidenciasIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './tipos_evidencias.controller': tiposEvidenciasCtrlStub
});

describe('TiposEvidencias API Router:', function() {

  it('should return an express router instance', function() {
    tiposEvidenciasIndex.should.equal(routerStub);
  });

  describe('GET /api/tipos_evidencias', function() {

    it('should route to tiposEvidencias.controller.index', function() {
      routerStub.get
        .withArgs('/', 'tiposEvidenciasCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/tipos_evidencias/:id', function() {

    it('should route to tiposEvidencias.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'tiposEvidenciasCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/tipos_evidencias', function() {

    it('should route to tiposEvidencias.controller.create', function() {
      routerStub.post
        .withArgs('/', 'tiposEvidenciasCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/tipos_evidencias/:id', function() {

    it('should route to tiposEvidencias.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'tiposEvidenciasCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/tipos_evidencias/:id', function() {

    it('should route to tiposEvidencias.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'tiposEvidenciasCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/tipos_evidencias/:id', function() {

    it('should route to tiposEvidencias.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'tiposEvidenciasCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
