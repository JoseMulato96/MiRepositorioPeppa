'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var regionalesCtrlStub = {
  index: 'regionalesCtrl.index',
  show: 'regionalesCtrl.show',
  create: 'regionalesCtrl.create',
  update: 'regionalesCtrl.update',
  destroy: 'regionalesCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var regionalesIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './regionales.controller': regionalesCtrlStub
});

describe('Regionales API Router:', function() {

  it('should return an express router instance', function() {
    regionalesIndex.should.equal(routerStub);
  });

  describe('GET /api/regionales', function() {

    it('should route to regionales.controller.index', function() {
      routerStub.get
        .withArgs('/', 'regionalesCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/regionales/:id', function() {

    it('should route to regionales.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'regionalesCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/regionales', function() {

    it('should route to regionales.controller.create', function() {
      routerStub.post
        .withArgs('/', 'regionalesCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/regionales/:id', function() {

    it('should route to regionales.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'regionalesCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/regionales/:id', function() {

    it('should route to regionales.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'regionalesCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/regionales/:id', function() {

    it('should route to regionales.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'regionalesCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
