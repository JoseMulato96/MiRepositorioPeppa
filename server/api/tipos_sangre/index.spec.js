'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var tiposSangreCtrlStub = {
  index: 'tiposSangreCtrl.index',
  show: 'tiposSangreCtrl.show',
  create: 'tiposSangreCtrl.create',
  update: 'tiposSangreCtrl.update',
  destroy: 'tiposSangreCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var tiposSangreIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './tipos_sangre.controller': tiposSangreCtrlStub
});

describe('TiposSangre API Router:', function() {

  it('should return an express router instance', function() {
    tiposSangreIndex.should.equal(routerStub);
  });

  describe('GET /api/tipos_sangre', function() {

    it('should route to tiposSangre.controller.index', function() {
      routerStub.get
        .withArgs('/', 'tiposSangreCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/tipos_sangre/:id', function() {

    it('should route to tiposSangre.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'tiposSangreCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/tipos_sangre', function() {

    it('should route to tiposSangre.controller.create', function() {
      routerStub.post
        .withArgs('/', 'tiposSangreCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/tipos_sangre/:id', function() {

    it('should route to tiposSangre.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'tiposSangreCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/tipos_sangre/:id', function() {

    it('should route to tiposSangre.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'tiposSangreCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/tipos_sangre/:id', function() {

    it('should route to tiposSangre.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'tiposSangreCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
