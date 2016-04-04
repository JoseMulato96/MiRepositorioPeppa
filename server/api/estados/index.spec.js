'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var estadosCtrlStub = {
  index: 'estadosCtrl.index',
  show: 'estadosCtrl.show',
  create: 'estadosCtrl.create',
  update: 'estadosCtrl.update',
  destroy: 'estadosCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var estadosIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './estados.controller': estadosCtrlStub
});

describe('Estados API Router:', function() {

  it('should return an express router instance', function() {
    estadosIndex.should.equal(routerStub);
  });

  describe('GET /api/estados', function() {

    it('should route to estados.controller.index', function() {
      routerStub.get
        .withArgs('/', 'estadosCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/estados/:id', function() {

    it('should route to estados.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'estadosCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/estados', function() {

    it('should route to estados.controller.create', function() {
      routerStub.post
        .withArgs('/', 'estadosCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/estados/:id', function() {

    it('should route to estados.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'estadosCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/estados/:id', function() {

    it('should route to estados.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'estadosCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/estados/:id', function() {

    it('should route to estados.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'estadosCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
