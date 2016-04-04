'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var desercionesCtrlStub = {
  index: 'desercionesCtrl.index',
  show: 'desercionesCtrl.show',
  create: 'desercionesCtrl.create',
  update: 'desercionesCtrl.update',
  destroy: 'desercionesCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var desercionesIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './deserciones.controller': desercionesCtrlStub
});

describe('Deserciones API Router:', function() {

  it('should return an express router instance', function() {
    desercionesIndex.should.equal(routerStub);
  });

  describe('GET /api/deserciones', function() {

    it('should route to deserciones.controller.index', function() {
      routerStub.get
        .withArgs('/', 'desercionesCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/deserciones/:id', function() {

    it('should route to deserciones.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'desercionesCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/deserciones', function() {

    it('should route to deserciones.controller.create', function() {
      routerStub.post
        .withArgs('/', 'desercionesCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/deserciones/:id', function() {

    it('should route to deserciones.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'desercionesCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/deserciones/:id', function() {

    it('should route to deserciones.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'desercionesCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/deserciones/:id', function() {

    it('should route to deserciones.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'desercionesCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
