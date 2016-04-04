'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var conocimientosConceptosPrincipiosCtrlStub = {
  index: 'conocimientosConceptosPrincipiosCtrl.index',
  show: 'conocimientosConceptosPrincipiosCtrl.show',
  create: 'conocimientosConceptosPrincipiosCtrl.create',
  update: 'conocimientosConceptosPrincipiosCtrl.update',
  destroy: 'conocimientosConceptosPrincipiosCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var conocimientosConceptosPrincipiosIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './conocimientos_conceptos_principios.controller': conocimientosConceptosPrincipiosCtrlStub
});

describe('ConocimientosConceptosPrincipios API Router:', function() {

  it('should return an express router instance', function() {
    conocimientosConceptosPrincipiosIndex.should.equal(routerStub);
  });

  describe('GET /api/conocimientos_conceptos_principios', function() {

    it('should route to conocimientosConceptosPrincipios.controller.index', function() {
      routerStub.get
        .withArgs('/', 'conocimientosConceptosPrincipiosCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/conocimientos_conceptos_principios/:id', function() {

    it('should route to conocimientosConceptosPrincipios.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'conocimientosConceptosPrincipiosCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/conocimientos_conceptos_principios', function() {

    it('should route to conocimientosConceptosPrincipios.controller.create', function() {
      routerStub.post
        .withArgs('/', 'conocimientosConceptosPrincipiosCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/conocimientos_conceptos_principios/:id', function() {

    it('should route to conocimientosConceptosPrincipios.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'conocimientosConceptosPrincipiosCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/conocimientos_conceptos_principios/:id', function() {

    it('should route to conocimientosConceptosPrincipios.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'conocimientosConceptosPrincipiosCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/conocimientos_conceptos_principios/:id', function() {

    it('should route to conocimientosConceptosPrincipios.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'conocimientosConceptosPrincipiosCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
