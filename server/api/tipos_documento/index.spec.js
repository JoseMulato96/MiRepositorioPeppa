'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var tiposDocumentoCtrlStub = {
  index: 'tiposDocumentoCtrl.index',
  show: 'tiposDocumentoCtrl.show',
  create: 'tiposDocumentoCtrl.create',
  update: 'tiposDocumentoCtrl.update',
  destroy: 'tiposDocumentoCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var tiposDocumentoIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './tipos_documento.controller': tiposDocumentoCtrlStub
});

describe('TiposDocumento API Router:', function() {

  it('should return an express router instance', function() {
    tiposDocumentoIndex.should.equal(routerStub);
  });

  describe('GET /api/tipos_documento', function() {

    it('should route to tiposDocumento.controller.index', function() {
      routerStub.get
        .withArgs('/', 'tiposDocumentoCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/tipos_documento/:id', function() {

    it('should route to tiposDocumento.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'tiposDocumentoCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/tipos_documento', function() {

    it('should route to tiposDocumento.controller.create', function() {
      routerStub.post
        .withArgs('/', 'tiposDocumentoCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/tipos_documento/:id', function() {

    it('should route to tiposDocumento.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'tiposDocumentoCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/tipos_documento/:id', function() {

    it('should route to tiposDocumento.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'tiposDocumentoCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/tipos_documento/:id', function() {

    it('should route to tiposDocumento.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'tiposDocumentoCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
