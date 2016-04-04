'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var actividadesAprendizajeCtrlStub = {
  index: 'actividadesAprendizajeCtrl.index',
  show: 'actividadesAprendizajeCtrl.show',
  create: 'actividadesAprendizajeCtrl.create',
  update: 'actividadesAprendizajeCtrl.update',
  destroy: 'actividadesAprendizajeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var actividadesAprendizajeIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './actividades_aprendizaje.controller': actividadesAprendizajeCtrlStub
});

describe('ActividadesAprendizaje API Router:', function() {

  it('should return an express router instance', function() {
    actividadesAprendizajeIndex.should.equal(routerStub);
  });

  describe('GET /api/actividades_aprendizaje', function() {

    it('should route to actividadesAprendizaje.controller.index', function() {
      routerStub.get
        .withArgs('/', 'actividadesAprendizajeCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/actividades_aprendizaje/:id', function() {

    it('should route to actividadesAprendizaje.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'actividadesAprendizajeCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/actividades_aprendizaje', function() {

    it('should route to actividadesAprendizaje.controller.create', function() {
      routerStub.post
        .withArgs('/', 'actividadesAprendizajeCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/actividades_aprendizaje/:id', function() {

    it('should route to actividadesAprendizaje.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'actividadesAprendizajeCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/actividades_aprendizaje/:id', function() {

    it('should route to actividadesAprendizaje.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'actividadesAprendizajeCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/actividades_aprendizaje/:id', function() {

    it('should route to actividadesAprendizaje.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'actividadesAprendizajeCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
