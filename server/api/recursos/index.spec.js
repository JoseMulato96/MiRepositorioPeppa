'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var recursosCtrlStub = {
  index: 'recursosCtrl.index',
  show: 'recursosCtrl.show',
  create: 'recursosCtrl.create',
  update: 'recursosCtrl.update',
  destroy: 'recursosCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var recursosIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './recursos.controller': recursosCtrlStub
});

describe('Recursos API Router:', function() {

  it('should return an express router instance', function() {
    recursosIndex.should.equal(routerStub);
  });

  describe('GET /api/recursos', function() {

    it('should route to recursos.controller.index', function() {
      routerStub.get
        .withArgs('/', 'recursosCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/recursos/:id', function() {

    it('should route to recursos.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'recursosCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/recursos', function() {

    it('should route to recursos.controller.create', function() {
      routerStub.post
        .withArgs('/', 'recursosCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/recursos/:id', function() {

    it('should route to recursos.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'recursosCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/recursos/:id', function() {

    it('should route to recursos.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'recursosCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/recursos/:id', function() {

    it('should route to recursos.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'recursosCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
