'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var evidenciasCtrlStub = {
  index: 'evidenciasCtrl.index',
  show: 'evidenciasCtrl.show',
  create: 'evidenciasCtrl.create',
  update: 'evidenciasCtrl.update',
  destroy: 'evidenciasCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var evidenciasIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './evidencias.controller': evidenciasCtrlStub
});

describe('Evidencias API Router:', function() {

  it('should return an express router instance', function() {
    evidenciasIndex.should.equal(routerStub);
  });

  describe('GET /api/evidencias', function() {

    it('should route to evidencias.controller.index', function() {
      routerStub.get
        .withArgs('/', 'evidenciasCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/evidencias/:id', function() {

    it('should route to evidencias.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'evidenciasCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/evidencias', function() {

    it('should route to evidencias.controller.create', function() {
      routerStub.post
        .withArgs('/', 'evidenciasCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/evidencias/:id', function() {

    it('should route to evidencias.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'evidenciasCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/evidencias/:id', function() {

    it('should route to evidencias.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'evidenciasCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/evidencias/:id', function() {

    it('should route to evidencias.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'evidenciasCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
