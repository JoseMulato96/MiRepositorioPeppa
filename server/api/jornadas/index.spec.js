'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var jornadasCtrlStub = {
  index: 'jornadasCtrl.index',
  show: 'jornadasCtrl.show',
  create: 'jornadasCtrl.create',
  update: 'jornadasCtrl.update',
  destroy: 'jornadasCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var jornadasIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './jornadas.controller': jornadasCtrlStub
});

describe('Jornadas API Router:', function() {

  it('should return an express router instance', function() {
    jornadasIndex.should.equal(routerStub);
  });

  describe('GET /api/jornadas', function() {

    it('should route to jornadas.controller.index', function() {
      routerStub.get
        .withArgs('/', 'jornadasCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/jornadas/:id', function() {

    it('should route to jornadas.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'jornadasCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/jornadas', function() {

    it('should route to jornadas.controller.create', function() {
      routerStub.post
        .withArgs('/', 'jornadasCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/jornadas/:id', function() {

    it('should route to jornadas.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'jornadasCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/jornadas/:id', function() {

    it('should route to jornadas.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'jornadasCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/jornadas/:id', function() {

    it('should route to jornadas.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'jornadasCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
