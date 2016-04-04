'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var actividadesCtrlStub = {
  index: 'actividadesCtrl.index',
  show: 'actividadesCtrl.show',
  create: 'actividadesCtrl.create',
  update: 'actividadesCtrl.update',
  destroy: 'actividadesCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var actividadesIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './actividades.controller': actividadesCtrlStub
});

describe('Actividades API Router:', function() {

  it('should return an express router instance', function() {
    actividadesIndex.should.equal(routerStub);
  });

  describe('GET /api/actividades', function() {

    it('should route to actividades.controller.index', function() {
      routerStub.get
        .withArgs('/', 'actividadesCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/actividades/:id', function() {

    it('should route to actividades.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'actividadesCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/actividades', function() {

    it('should route to actividades.controller.create', function() {
      routerStub.post
        .withArgs('/', 'actividadesCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/actividades/:id', function() {

    it('should route to actividades.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'actividadesCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/actividades/:id', function() {

    it('should route to actividades.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'actividadesCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/actividades/:id', function() {

    it('should route to actividades.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'actividadesCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
