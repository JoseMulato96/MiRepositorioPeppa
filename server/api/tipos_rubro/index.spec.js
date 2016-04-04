'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var tiposRubroCtrlStub = {
  index: 'tiposRubroCtrl.index',
  show: 'tiposRubroCtrl.show',
  create: 'tiposRubroCtrl.create',
  update: 'tiposRubroCtrl.update',
  destroy: 'tiposRubroCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var tiposRubroIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './tipos_rubro.controller': tiposRubroCtrlStub
});

describe('TiposRubro API Router:', function() {

  it('should return an express router instance', function() {
    tiposRubroIndex.should.equal(routerStub);
  });

  describe('GET /api/tipos_rubro', function() {

    it('should route to tiposRubro.controller.index', function() {
      routerStub.get
        .withArgs('/', 'tiposRubroCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/tipos_rubro/:id', function() {

    it('should route to tiposRubro.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'tiposRubroCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/tipos_rubro', function() {

    it('should route to tiposRubro.controller.create', function() {
      routerStub.post
        .withArgs('/', 'tiposRubroCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/tipos_rubro/:id', function() {

    it('should route to tiposRubro.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'tiposRubroCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/tipos_rubro/:id', function() {

    it('should route to tiposRubro.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'tiposRubroCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/tipos_rubro/:id', function() {

    it('should route to tiposRubro.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'tiposRubroCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
