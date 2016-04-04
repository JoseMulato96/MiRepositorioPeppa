'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var unidadesMedidaCtrlStub = {
  index: 'unidadesMedidaCtrl.index',
  show: 'unidadesMedidaCtrl.show',
  create: 'unidadesMedidaCtrl.create',
  update: 'unidadesMedidaCtrl.update',
  destroy: 'unidadesMedidaCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var unidadesMedidaIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './unidades_medida.controller': unidadesMedidaCtrlStub
});

describe('UnidadesMedida API Router:', function() {

  it('should return an express router instance', function() {
    unidadesMedidaIndex.should.equal(routerStub);
  });

  describe('GET /api/unidades_medida', function() {

    it('should route to unidadesMedida.controller.index', function() {
      routerStub.get
        .withArgs('/', 'unidadesMedidaCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/unidades_medida/:id', function() {

    it('should route to unidadesMedida.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'unidadesMedidaCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/unidades_medida', function() {

    it('should route to unidadesMedida.controller.create', function() {
      routerStub.post
        .withArgs('/', 'unidadesMedidaCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/unidades_medida/:id', function() {

    it('should route to unidadesMedida.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'unidadesMedidaCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/unidades_medida/:id', function() {

    it('should route to unidadesMedida.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'unidadesMedidaCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/unidades_medida/:id', function() {

    it('should route to unidadesMedida.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'unidadesMedidaCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
