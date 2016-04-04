'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var etapasPracticaCtrlStub = {
  index: 'etapasPracticaCtrl.index',
  show: 'etapasPracticaCtrl.show',
  create: 'etapasPracticaCtrl.create',
  update: 'etapasPracticaCtrl.update',
  destroy: 'etapasPracticaCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var etapasPracticaIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './etapas_practica.controller': etapasPracticaCtrlStub
});

describe('EtapasPractica API Router:', function() {

  it('should return an express router instance', function() {
    etapasPracticaIndex.should.equal(routerStub);
  });

  describe('GET /api/etapas_practicas', function() {

    it('should route to etapasPractica.controller.index', function() {
      routerStub.get
        .withArgs('/', 'etapasPracticaCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/etapas_practicas/:id', function() {

    it('should route to etapasPractica.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'etapasPracticaCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/etapas_practicas', function() {

    it('should route to etapasPractica.controller.create', function() {
      routerStub.post
        .withArgs('/', 'etapasPracticaCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/etapas_practicas/:id', function() {

    it('should route to etapasPractica.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'etapasPracticaCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/etapas_practicas/:id', function() {

    it('should route to etapasPractica.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'etapasPracticaCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/etapas_practicas/:id', function() {

    it('should route to etapasPractica.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'etapasPracticaCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
