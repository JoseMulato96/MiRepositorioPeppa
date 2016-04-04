'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var fuenteRecursosCtrlStub = {
  index: 'fuenteRecursosCtrl.index',
  show: 'fuenteRecursosCtrl.show',
  create: 'fuenteRecursosCtrl.create',
  update: 'fuenteRecursosCtrl.update',
  destroy: 'fuenteRecursosCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var fuenteRecursosIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './fuente_recursos.controller': fuenteRecursosCtrlStub
});

describe('FuenteRecursos API Router:', function() {

  it('should return an express router instance', function() {
    fuenteRecursosIndex.should.equal(routerStub);
  });

  describe('GET /api/fuente_recursos', function() {

    it('should route to fuenteRecursos.controller.index', function() {
      routerStub.get
        .withArgs('/', 'fuenteRecursosCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/fuente_recursos/:id', function() {

    it('should route to fuenteRecursos.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'fuenteRecursosCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/fuente_recursos', function() {

    it('should route to fuenteRecursos.controller.create', function() {
      routerStub.post
        .withArgs('/', 'fuenteRecursosCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/fuente_recursos/:id', function() {

    it('should route to fuenteRecursos.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'fuenteRecursosCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/fuente_recursos/:id', function() {

    it('should route to fuenteRecursos.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'fuenteRecursosCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/fuente_recursos/:id', function() {

    it('should route to fuenteRecursos.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'fuenteRecursosCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
