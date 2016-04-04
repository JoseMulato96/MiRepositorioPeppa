'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var ciudadesCtrlStub = {
  index: 'ciudadesCtrl.index',
  show: 'ciudadesCtrl.show',
  create: 'ciudadesCtrl.create',
  update: 'ciudadesCtrl.update',
  destroy: 'ciudadesCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var ciudadesIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './ciudades.controller': ciudadesCtrlStub
});

describe('Ciudades API Router:', function() {

  it('should return an express router instance', function() {
    ciudadesIndex.should.equal(routerStub);
  });

  describe('GET /api/ciudades', function() {

    it('should route to ciudades.controller.index', function() {
      routerStub.get
        .withArgs('/', 'ciudadesCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/ciudades/:id', function() {

    it('should route to ciudades.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'ciudadesCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/ciudades', function() {

    it('should route to ciudades.controller.create', function() {
      routerStub.post
        .withArgs('/', 'ciudadesCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/ciudades/:id', function() {

    it('should route to ciudades.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'ciudadesCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/ciudades/:id', function() {

    it('should route to ciudades.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'ciudadesCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/ciudades/:id', function() {

    it('should route to ciudades.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'ciudadesCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
