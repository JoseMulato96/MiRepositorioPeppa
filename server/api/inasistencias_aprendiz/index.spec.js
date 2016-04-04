'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var inasistenciasAprendizCtrlStub = {
  index: 'inasistenciasAprendizCtrl.index',
  show: 'inasistenciasAprendizCtrl.show',
  create: 'inasistenciasAprendizCtrl.create',
  update: 'inasistenciasAprendizCtrl.update',
  destroy: 'inasistenciasAprendizCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var inasistenciasAprendizIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './inasistencias_aprendiz.controller': inasistenciasAprendizCtrlStub
});

describe('InasistenciasAprendiz API Router:', function() {

  it('should return an express router instance', function() {
    inasistenciasAprendizIndex.should.equal(routerStub);
  });

  describe('GET /api/inasistencias_aprendiz', function() {

    it('should route to inasistenciasAprendiz.controller.index', function() {
      routerStub.get
        .withArgs('/', 'inasistenciasAprendizCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/inasistencias_aprendiz/:id', function() {

    it('should route to inasistenciasAprendiz.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'inasistenciasAprendizCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/inasistencias_aprendiz', function() {

    it('should route to inasistenciasAprendiz.controller.create', function() {
      routerStub.post
        .withArgs('/', 'inasistenciasAprendizCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/inasistencias_aprendiz/:id', function() {

    it('should route to inasistenciasAprendiz.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'inasistenciasAprendizCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/inasistencias_aprendiz/:id', function() {

    it('should route to inasistenciasAprendiz.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'inasistenciasAprendizCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/inasistencias_aprendiz/:id', function() {

    it('should route to inasistenciasAprendiz.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'inasistenciasAprendizCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
