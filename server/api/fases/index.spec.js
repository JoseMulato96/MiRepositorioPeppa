'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var fasesCtrlStub = {
  index: 'fasesCtrl.index',
  show: 'fasesCtrl.show',
  create: 'fasesCtrl.create',
  update: 'fasesCtrl.update',
  destroy: 'fasesCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var fasesIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './fases.controller': fasesCtrlStub
});

describe('Fases API Router:', function() {

  it('should return an express router instance', function() {
    fasesIndex.should.equal(routerStub);
  });

  describe('GET /api/fases', function() {

    it('should route to fases.controller.index', function() {
      routerStub.get
        .withArgs('/', 'fasesCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/fases/:id', function() {

    it('should route to fases.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'fasesCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/fases', function() {

    it('should route to fases.controller.create', function() {
      routerStub.post
        .withArgs('/', 'fasesCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/fases/:id', function() {

    it('should route to fases.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'fasesCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/fases/:id', function() {

    it('should route to fases.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'fasesCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/fases/:id', function() {

    it('should route to fases.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'fasesCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
