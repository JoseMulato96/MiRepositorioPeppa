'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var tiposRecursoCtrlStub = {
  index: 'tiposRecursoCtrl.index',
  show: 'tiposRecursoCtrl.show',
  create: 'tiposRecursoCtrl.create',
  update: 'tiposRecursoCtrl.update',
  destroy: 'tiposRecursoCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var tiposRecursoIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './tipos_recurso.controller': tiposRecursoCtrlStub
});

describe('TiposRecurso API Router:', function() {

  it('should return an express router instance', function() {
    tiposRecursoIndex.should.equal(routerStub);
  });

  describe('GET /api/tipos_recurso', function() {

    it('should route to tiposRecurso.controller.index', function() {
      routerStub.get
        .withArgs('/', 'tiposRecursoCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/tipos_recurso/:id', function() {

    it('should route to tiposRecurso.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'tiposRecursoCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/tipos_recurso', function() {

    it('should route to tiposRecurso.controller.create', function() {
      routerStub.post
        .withArgs('/', 'tiposRecursoCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/tipos_recurso/:id', function() {

    it('should route to tiposRecurso.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'tiposRecursoCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/tipos_recurso/:id', function() {

    it('should route to tiposRecurso.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'tiposRecursoCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/tipos_recurso/:id', function() {

    it('should route to tiposRecurso.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'tiposRecursoCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
