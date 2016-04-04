'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var criteriosEvaluacionCtrlStub = {
  index: 'criteriosEvaluacionCtrl.index',
  show: 'criteriosEvaluacionCtrl.show',
  create: 'criteriosEvaluacionCtrl.create',
  update: 'criteriosEvaluacionCtrl.update',
  destroy: 'criteriosEvaluacionCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var criteriosEvaluacionIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './criterios_evaluacion.controller': criteriosEvaluacionCtrlStub
});

describe('CriteriosEvaluacion API Router:', function() {

  it('should return an express router instance', function() {
    criteriosEvaluacionIndex.should.equal(routerStub);
  });

  describe('GET /api/criterios_evaluacion', function() {

    it('should route to criteriosEvaluacion.controller.index', function() {
      routerStub.get
        .withArgs('/', 'criteriosEvaluacionCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/criterios_evaluacion/:id', function() {

    it('should route to criteriosEvaluacion.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'criteriosEvaluacionCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/criterios_evaluacion', function() {

    it('should route to criteriosEvaluacion.controller.create', function() {
      routerStub.post
        .withArgs('/', 'criteriosEvaluacionCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/criterios_evaluacion/:id', function() {

    it('should route to criteriosEvaluacion.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'criteriosEvaluacionCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/criterios_evaluacion/:id', function() {

    it('should route to criteriosEvaluacion.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'criteriosEvaluacionCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/criterios_evaluacion/:id', function() {

    it('should route to criteriosEvaluacion.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'criteriosEvaluacionCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
