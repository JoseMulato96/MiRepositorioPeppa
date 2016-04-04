'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var instrumentosEvaluacionCtrlStub = {
  index: 'instrumentosEvaluacionCtrl.index',
  show: 'instrumentosEvaluacionCtrl.show',
  create: 'instrumentosEvaluacionCtrl.create',
  update: 'instrumentosEvaluacionCtrl.update',
  destroy: 'instrumentosEvaluacionCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var instrumentosEvaluacionIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './instrumentos_evaluacion.controller': instrumentosEvaluacionCtrlStub
});

describe('InstrumentosEvaluacion API Router:', function() {

  it('should return an express router instance', function() {
    instrumentosEvaluacionIndex.should.equal(routerStub);
  });

  describe('GET /api/instrumentos_evaluacion', function() {

    it('should route to instrumentosEvaluacion.controller.index', function() {
      routerStub.get
        .withArgs('/', 'instrumentosEvaluacionCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/instrumentos_evaluacion/:id', function() {

    it('should route to instrumentosEvaluacion.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'instrumentosEvaluacionCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/instrumentos_evaluacion', function() {

    it('should route to instrumentosEvaluacion.controller.create', function() {
      routerStub.post
        .withArgs('/', 'instrumentosEvaluacionCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/instrumentos_evaluacion/:id', function() {

    it('should route to instrumentosEvaluacion.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'instrumentosEvaluacionCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/instrumentos_evaluacion/:id', function() {

    it('should route to instrumentosEvaluacion.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'instrumentosEvaluacionCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/instrumentos_evaluacion/:id', function() {

    it('should route to instrumentosEvaluacion.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'instrumentosEvaluacionCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
