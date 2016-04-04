'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var programasCtrlStub = {
  index: 'programasCtrl.index',
  show: 'programasCtrl.show',
  create: 'programasCtrl.create',
  update: 'programasCtrl.update',
  destroy: 'programasCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var programasIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './programas.controller': programasCtrlStub
});

describe('Programas API Router:', function() {

  it('should return an express router instance', function() {
    programasIndex.should.equal(routerStub);
  });

  describe('GET /api/programas', function() {

    it('should route to programas.controller.index', function() {
      routerStub.get
        .withArgs('/', 'programasCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/programas/:id', function() {

    it('should route to programas.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'programasCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/programas', function() {

    it('should route to programas.controller.create', function() {
      routerStub.post
        .withArgs('/', 'programasCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/programas/:id', function() {

    it('should route to programas.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'programasCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/programas/:id', function() {

    it('should route to programas.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'programasCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/programas/:id', function() {

    it('should route to programas.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'programasCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
