'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var tipoActividadesAprendizajeCtrlStub = {
  index: 'tipoActividadesAprendizajeCtrl.index',
  show: 'tipoActividadesAprendizajeCtrl.show',
  create: 'tipoActividadesAprendizajeCtrl.create',
  update: 'tipoActividadesAprendizajeCtrl.update',
  destroy: 'tipoActividadesAprendizajeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var tipoActividadesAprendizajeIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './tipo_actividades_aprendizaje.controller': tipoActividadesAprendizajeCtrlStub
});

describe('TipoActividadesAprendizaje API Router:', function() {

  it('should return an express router instance', function() {
    tipoActividadesAprendizajeIndex.should.equal(routerStub);
  });

  describe('GET /api/tipo_actividades_aprendizaje', function() {

    it('should route to tipoActividadesAprendizaje.controller.index', function() {
      routerStub.get
        .withArgs('/', 'tipoActividadesAprendizajeCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/tipo_actividades_aprendizaje/:id', function() {

    it('should route to tipoActividadesAprendizaje.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'tipoActividadesAprendizajeCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/tipo_actividades_aprendizaje', function() {

    it('should route to tipoActividadesAprendizaje.controller.create', function() {
      routerStub.post
        .withArgs('/', 'tipoActividadesAprendizajeCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/tipo_actividades_aprendizaje/:id', function() {

    it('should route to tipoActividadesAprendizaje.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'tipoActividadesAprendizajeCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/tipo_actividades_aprendizaje/:id', function() {

    it('should route to tipoActividadesAprendizaje.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'tipoActividadesAprendizajeCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/tipo_actividades_aprendizaje/:id', function() {

    it('should route to tipoActividadesAprendizaje.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'tipoActividadesAprendizajeCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
