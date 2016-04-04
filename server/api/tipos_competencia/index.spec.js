'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var tiposCompetenciaCtrlStub = {
  index: 'tiposCompetenciaCtrl.index',
  show: 'tiposCompetenciaCtrl.show',
  create: 'tiposCompetenciaCtrl.create',
  update: 'tiposCompetenciaCtrl.update',
  destroy: 'tiposCompetenciaCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var tiposCompetenciaIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './tipos_competencia.controller': tiposCompetenciaCtrlStub
});

describe('TiposCompetencia API Router:', function() {

  it('should return an express router instance', function() {
    tiposCompetenciaIndex.should.equal(routerStub);
  });

  describe('GET /api/tipos_competencia', function() {

    it('should route to tiposCompetencia.controller.index', function() {
      routerStub.get
        .withArgs('/', 'tiposCompetenciaCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/tipos_competencia/:id', function() {

    it('should route to tiposCompetencia.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'tiposCompetenciaCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/tipos_competencia', function() {

    it('should route to tiposCompetencia.controller.create', function() {
      routerStub.post
        .withArgs('/', 'tiposCompetenciaCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/tipos_competencia/:id', function() {

    it('should route to tiposCompetencia.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'tiposCompetenciaCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/tipos_competencia/:id', function() {

    it('should route to tiposCompetencia.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'tiposCompetenciaCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/tipos_competencia/:id', function() {

    it('should route to tiposCompetencia.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'tiposCompetenciaCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
