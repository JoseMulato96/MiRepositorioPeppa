'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var conocimientosProcesoCtrlStub = {
  index: 'conocimientosProcesoCtrl.index',
  show: 'conocimientosProcesoCtrl.show',
  create: 'conocimientosProcesoCtrl.create',
  update: 'conocimientosProcesoCtrl.update',
  destroy: 'conocimientosProcesoCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var conocimientosProcesoIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './conocimientos_proceso.controller': conocimientosProcesoCtrlStub
});

describe('ConocimientosProceso API Router:', function() {

  it('should return an express router instance', function() {
    conocimientosProcesoIndex.should.equal(routerStub);
  });

  describe('GET /api/conocimientos_proceso', function() {

    it('should route to conocimientosProceso.controller.index', function() {
      routerStub.get
        .withArgs('/', 'conocimientosProcesoCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/conocimientos_proceso/:id', function() {

    it('should route to conocimientosProceso.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'conocimientosProcesoCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/conocimientos_proceso', function() {

    it('should route to conocimientosProceso.controller.create', function() {
      routerStub.post
        .withArgs('/', 'conocimientosProcesoCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/conocimientos_proceso/:id', function() {

    it('should route to conocimientosProceso.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'conocimientosProcesoCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/conocimientos_proceso/:id', function() {

    it('should route to conocimientosProceso.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'conocimientosProcesoCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/conocimientos_proceso/:id', function() {

    it('should route to conocimientosProceso.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'conocimientosProcesoCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
