'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var caracterizacionesCtrlStub = {
  index: 'caracterizacionesCtrl.index',
  show: 'caracterizacionesCtrl.show',
  create: 'caracterizacionesCtrl.create',
  update: 'caracterizacionesCtrl.update',
  destroy: 'caracterizacionesCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var caracterizacionesIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './caracterizaciones.controller': caracterizacionesCtrlStub
});

describe('Caracterizaciones API Router:', function() {

  it('should return an express router instance', function() {
    caracterizacionesIndex.should.equal(routerStub);
  });

  describe('GET /api/caracterizaciones', function() {

    it('should route to caracterizaciones.controller.index', function() {
      routerStub.get
        .withArgs('/', 'caracterizacionesCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/caracterizaciones/:id', function() {

    it('should route to caracterizaciones.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'caracterizacionesCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/caracterizaciones', function() {

    it('should route to caracterizaciones.controller.create', function() {
      routerStub.post
        .withArgs('/', 'caracterizacionesCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/caracterizaciones/:id', function() {

    it('should route to caracterizaciones.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'caracterizacionesCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/caracterizaciones/:id', function() {

    it('should route to caracterizaciones.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'caracterizacionesCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/caracterizaciones/:id', function() {

    it('should route to caracterizaciones.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'caracterizacionesCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
