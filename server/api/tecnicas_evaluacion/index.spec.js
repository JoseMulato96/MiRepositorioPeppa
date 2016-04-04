'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var tecnicasEvaluacionCtrlStub = {
  index: 'tecnicasEvaluacionCtrl.index',
  show: 'tecnicasEvaluacionCtrl.show',
  create: 'tecnicasEvaluacionCtrl.create',
  update: 'tecnicasEvaluacionCtrl.update',
  destroy: 'tecnicasEvaluacionCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var tecnicasEvaluacionIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './tecnicas_evaluacion.controller': tecnicasEvaluacionCtrlStub
});

describe('TecnicasEvaluacion API Router:', function() {

  it('should return an express router instance', function() {
    tecnicasEvaluacionIndex.should.equal(routerStub);
  });

  describe('GET /api/tecnicas_evaluacion', function() {

    it('should route to tecnicasEvaluacion.controller.index', function() {
      routerStub.get
        .withArgs('/', 'tecnicasEvaluacionCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/tecnicas_evaluacion/:id', function() {

    it('should route to tecnicasEvaluacion.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'tecnicasEvaluacionCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/tecnicas_evaluacion', function() {

    it('should route to tecnicasEvaluacion.controller.create', function() {
      routerStub.post
        .withArgs('/', 'tecnicasEvaluacionCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/tecnicas_evaluacion/:id', function() {

    it('should route to tecnicasEvaluacion.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'tecnicasEvaluacionCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/tecnicas_evaluacion/:id', function() {

    it('should route to tecnicasEvaluacion.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'tecnicasEvaluacionCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/tecnicas_evaluacion/:id', function() {

    it('should route to tecnicasEvaluacion.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'tecnicasEvaluacionCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
