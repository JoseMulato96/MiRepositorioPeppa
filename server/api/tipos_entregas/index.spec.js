'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var tiposEntregasCtrlStub = {
  index: 'tiposEntregasCtrl.index',
  show: 'tiposEntregasCtrl.show',
  create: 'tiposEntregasCtrl.create',
  update: 'tiposEntregasCtrl.update',
  destroy: 'tiposEntregasCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var tiposEntregasIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './tipos_entregas.controller': tiposEntregasCtrlStub
});

describe('TiposEntregas API Router:', function() {

  it('should return an express router instance', function() {
    tiposEntregasIndex.should.equal(routerStub);
  });

  describe('GET /api/tipos_entregas', function() {

    it('should route to tiposEntregas.controller.index', function() {
      routerStub.get
        .withArgs('/', 'tiposEntregasCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/tipos_entregas/:id', function() {

    it('should route to tiposEntregas.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'tiposEntregasCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/tipos_entregas', function() {

    it('should route to tiposEntregas.controller.create', function() {
      routerStub.post
        .withArgs('/', 'tiposEntregasCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/tipos_entregas/:id', function() {

    it('should route to tiposEntregas.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'tiposEntregasCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/tipos_entregas/:id', function() {

    it('should route to tiposEntregas.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'tiposEntregasCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/tipos_entregas/:id', function() {

    it('should route to tiposEntregas.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'tiposEntregasCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
