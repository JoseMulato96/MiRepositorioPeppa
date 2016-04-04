'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var tiposAmbienteCtrlStub = {
  index: 'tiposAmbienteCtrl.index',
  show: 'tiposAmbienteCtrl.show',
  create: 'tiposAmbienteCtrl.create',
  update: 'tiposAmbienteCtrl.update',
  destroy: 'tiposAmbienteCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var tiposAmbienteIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './tipos_ambiente.controller': tiposAmbienteCtrlStub
});

describe('TiposAmbiente API Router:', function() {

  it('should return an express router instance', function() {
    tiposAmbienteIndex.should.equal(routerStub);
  });

  describe('GET /api/tipos_ambiente', function() {

    it('should route to tiposAmbiente.controller.index', function() {
      routerStub.get
        .withArgs('/', 'tiposAmbienteCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/tipos_ambiente/:id', function() {

    it('should route to tiposAmbiente.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'tiposAmbienteCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/tipos_ambiente', function() {

    it('should route to tiposAmbiente.controller.create', function() {
      routerStub.post
        .withArgs('/', 'tiposAmbienteCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/tipos_ambiente/:id', function() {

    it('should route to tiposAmbiente.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'tiposAmbienteCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/tipos_ambiente/:id', function() {

    it('should route to tiposAmbiente.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'tiposAmbienteCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/tipos_ambiente/:id', function() {

    it('should route to tiposAmbiente.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'tiposAmbienteCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
