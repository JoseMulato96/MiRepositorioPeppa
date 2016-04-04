'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var guiasAprendizajeCtrlStub = {
  index: 'guiasAprendizajeCtrl.index',
  show: 'guiasAprendizajeCtrl.show',
  create: 'guiasAprendizajeCtrl.create',
  update: 'guiasAprendizajeCtrl.update',
  destroy: 'guiasAprendizajeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var guiasAprendizajeIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './guias_aprendizaje.controller': guiasAprendizajeCtrlStub
});

describe('GuiasAprendizaje API Router:', function() {

  it('should return an express router instance', function() {
    guiasAprendizajeIndex.should.equal(routerStub);
  });

  describe('GET /api/guias_aprendizaje', function() {

    it('should route to guiasAprendizaje.controller.index', function() {
      routerStub.get
        .withArgs('/', 'guiasAprendizajeCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/guias_aprendizaje/:id', function() {

    it('should route to guiasAprendizaje.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'guiasAprendizajeCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/guias_aprendizaje', function() {

    it('should route to guiasAprendizaje.controller.create', function() {
      routerStub.post
        .withArgs('/', 'guiasAprendizajeCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/guias_aprendizaje/:id', function() {

    it('should route to guiasAprendizaje.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'guiasAprendizajeCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/guias_aprendizaje/:id', function() {

    it('should route to guiasAprendizaje.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'guiasAprendizajeCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/guias_aprendizaje/:id', function() {

    it('should route to guiasAprendizaje.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'guiasAprendizajeCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
