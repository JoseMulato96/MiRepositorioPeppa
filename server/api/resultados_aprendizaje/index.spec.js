'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var resultadosAprendizajeCtrlStub = {
  index: 'resultadosAprendizajeCtrl.index',
  show: 'resultadosAprendizajeCtrl.show',
  create: 'resultadosAprendizajeCtrl.create',
  update: 'resultadosAprendizajeCtrl.update',
  destroy: 'resultadosAprendizajeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var resultadosAprendizajeIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './resultados_aprendizaje.controller': resultadosAprendizajeCtrlStub
});

describe('ResultadosAprendizaje API Router:', function() {

  it('should return an express router instance', function() {
    resultadosAprendizajeIndex.should.equal(routerStub);
  });

  describe('GET /api/resultados_aprendizaje', function() {

    it('should route to resultadosAprendizaje.controller.index', function() {
      routerStub.get
        .withArgs('/', 'resultadosAprendizajeCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/resultados_aprendizaje/:id', function() {

    it('should route to resultadosAprendizaje.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'resultadosAprendizajeCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/resultados_aprendizaje', function() {

    it('should route to resultadosAprendizaje.controller.create', function() {
      routerStub.post
        .withArgs('/', 'resultadosAprendizajeCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/resultados_aprendizaje/:id', function() {

    it('should route to resultadosAprendizaje.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'resultadosAprendizajeCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/resultados_aprendizaje/:id', function() {

    it('should route to resultadosAprendizaje.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'resultadosAprendizajeCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/resultados_aprendizaje/:id', function() {

    it('should route to resultadosAprendizaje.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'resultadosAprendizajeCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
