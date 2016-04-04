'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var areasCtrlStub = {
  index: 'areasCtrl.index',
  show: 'areasCtrl.show',
  create: 'areasCtrl.create',
  update: 'areasCtrl.update',
  destroy: 'areasCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var areasIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './areas.controller': areasCtrlStub
});

describe('Areas API Router:', function() {

  it('should return an express router instance', function() {
    areasIndex.should.equal(routerStub);
  });

  describe('GET /api/areas', function() {

    it('should route to areas.controller.index', function() {
      routerStub.get
        .withArgs('/', 'areasCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/areas/:id', function() {

    it('should route to areas.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'areasCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/areas', function() {

    it('should route to areas.controller.create', function() {
      routerStub.post
        .withArgs('/', 'areasCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/areas/:id', function() {

    it('should route to areas.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'areasCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/areas/:id', function() {

    it('should route to areas.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'areasCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/areas/:id', function() {

    it('should route to areas.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'areasCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
