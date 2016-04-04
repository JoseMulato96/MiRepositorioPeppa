'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var tiposFormacionCtrlStub = {
  index: 'tiposFormacionCtrl.index',
  show: 'tiposFormacionCtrl.show',
  create: 'tiposFormacionCtrl.create',
  update: 'tiposFormacionCtrl.update',
  destroy: 'tiposFormacionCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var tiposFormacionIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './tipos_formacion.controller': tiposFormacionCtrlStub
});

describe('TiposFormacion API Router:', function() {

  it('should return an express router instance', function() {
    tiposFormacionIndex.should.equal(routerStub);
  });

  describe('GET /api/tipos_formacion', function() {

    it('should route to tiposFormacion.controller.index', function() {
      routerStub.get
        .withArgs('/', 'tiposFormacionCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/tipos_formacion/:id', function() {

    it('should route to tiposFormacion.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'tiposFormacionCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/tipos_formacion', function() {

    it('should route to tiposFormacion.controller.create', function() {
      routerStub.post
        .withArgs('/', 'tiposFormacionCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/tipos_formacion/:id', function() {

    it('should route to tiposFormacion.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'tiposFormacionCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/tipos_formacion/:id', function() {

    it('should route to tiposFormacion.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'tiposFormacionCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/tipos_formacion/:id', function() {

    it('should route to tiposFormacion.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'tiposFormacionCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
