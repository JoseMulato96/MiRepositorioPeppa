'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var categoriasAmbienteCtrlStub = {
  index: 'categoriasAmbienteCtrl.index',
  show: 'categoriasAmbienteCtrl.show',
  create: 'categoriasAmbienteCtrl.create',
  update: 'categoriasAmbienteCtrl.update',
  destroy: 'categoriasAmbienteCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var categoriasAmbienteIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './categorias_ambiente.controller': categoriasAmbienteCtrlStub
});

describe('CategoriasAmbiente API Router:', function() {

  it('should return an express router instance', function() {
    categoriasAmbienteIndex.should.equal(routerStub);
  });

  describe('GET /api/categorias_ambiente', function() {

    it('should route to categoriasAmbiente.controller.index', function() {
      routerStub.get
        .withArgs('/', 'categoriasAmbienteCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/categorias_ambiente/:id', function() {

    it('should route to categoriasAmbiente.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'categoriasAmbienteCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/categorias_ambiente', function() {

    it('should route to categoriasAmbiente.controller.create', function() {
      routerStub.post
        .withArgs('/', 'categoriasAmbienteCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/categorias_ambiente/:id', function() {

    it('should route to categoriasAmbiente.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'categoriasAmbienteCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/categorias_ambiente/:id', function() {

    it('should route to categoriasAmbiente.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'categoriasAmbienteCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/categorias_ambiente/:id', function() {

    it('should route to categoriasAmbiente.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'categoriasAmbienteCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
