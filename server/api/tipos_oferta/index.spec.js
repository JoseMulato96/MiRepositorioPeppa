'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var tiposOfertaCtrlStub = {
  index: 'tiposOfertaCtrl.index',
  show: 'tiposOfertaCtrl.show',
  create: 'tiposOfertaCtrl.create',
  update: 'tiposOfertaCtrl.update',
  destroy: 'tiposOfertaCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var tiposOfertaIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './tipos_oferta.controller': tiposOfertaCtrlStub
});

describe('TiposOferta API Router:', function() {

  it('should return an express router instance', function() {
    tiposOfertaIndex.should.equal(routerStub);
  });

  describe('GET /api/tipos_oferta', function() {

    it('should route to tiposOferta.controller.index', function() {
      routerStub.get
        .withArgs('/', 'tiposOfertaCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/tipos_oferta/:id', function() {

    it('should route to tiposOferta.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'tiposOfertaCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/tipos_oferta', function() {

    it('should route to tiposOferta.controller.create', function() {
      routerStub.post
        .withArgs('/', 'tiposOfertaCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/tipos_oferta/:id', function() {

    it('should route to tiposOferta.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'tiposOfertaCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/tipos_oferta/:id', function() {

    it('should route to tiposOferta.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'tiposOfertaCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/tipos_oferta/:id', function() {

    it('should route to tiposOferta.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'tiposOfertaCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
