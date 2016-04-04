'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var tiposVoceroCtrlStub = {
  index: 'tiposVoceroCtrl.index',
  show: 'tiposVoceroCtrl.show',
  create: 'tiposVoceroCtrl.create',
  update: 'tiposVoceroCtrl.update',
  destroy: 'tiposVoceroCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var tiposVoceroIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './tipos_vocero.controller': tiposVoceroCtrlStub
});

describe('TiposVocero API Router:', function() {

  it('should return an express router instance', function() {
    tiposVoceroIndex.should.equal(routerStub);
  });

  describe('GET /api/tipos_vocero', function() {

    it('should route to tiposVocero.controller.index', function() {
      routerStub.get
        .withArgs('/', 'tiposVoceroCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/tipos_vocero/:id', function() {

    it('should route to tiposVocero.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'tiposVoceroCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/tipos_vocero', function() {

    it('should route to tiposVocero.controller.create', function() {
      routerStub.post
        .withArgs('/', 'tiposVoceroCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/tipos_vocero/:id', function() {

    it('should route to tiposVocero.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'tiposVoceroCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/tipos_vocero/:id', function() {

    it('should route to tiposVocero.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'tiposVoceroCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/tipos_vocero/:id', function() {

    it('should route to tiposVocero.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'tiposVoceroCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
