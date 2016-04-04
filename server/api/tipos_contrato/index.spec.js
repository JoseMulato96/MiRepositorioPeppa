'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var tiposContratoCtrlStub = {
  index: 'tiposContratoCtrl.index',
  show: 'tiposContratoCtrl.show',
  create: 'tiposContratoCtrl.create',
  update: 'tiposContratoCtrl.update',
  destroy: 'tiposContratoCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var tiposContratoIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './tipos_contrato.controller': tiposContratoCtrlStub
});

describe('TiposContrato API Router:', function() {

  it('should return an express router instance', function() {
    tiposContratoIndex.should.equal(routerStub);
  });

  describe('GET /api/tipos_contrato', function() {

    it('should route to tiposContrato.controller.index', function() {
      routerStub.get
        .withArgs('/', 'tiposContratoCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/tipos_contrato/:id', function() {

    it('should route to tiposContrato.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'tiposContratoCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/tipos_contrato', function() {

    it('should route to tiposContrato.controller.create', function() {
      routerStub.post
        .withArgs('/', 'tiposContratoCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/tipos_contrato/:id', function() {

    it('should route to tiposContrato.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'tiposContratoCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/tipos_contrato/:id', function() {

    it('should route to tiposContrato.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'tiposContratoCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/tipos_contrato/:id', function() {

    it('should route to tiposContrato.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'tiposContratoCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
