'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var centrosFormacionCtrlStub = {
  index: 'centrosFormacionCtrl.index',
  show: 'centrosFormacionCtrl.show',
  create: 'centrosFormacionCtrl.create',
  update: 'centrosFormacionCtrl.update',
  destroy: 'centrosFormacionCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var centrosFormacionIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './centros_formacion.controller': centrosFormacionCtrlStub
});

describe('CentrosFormacion API Router:', function() {

  it('should return an express router instance', function() {
    centrosFormacionIndex.should.equal(routerStub);
  });

  describe('GET /api/centros_formacion', function() {

    it('should route to centrosFormacion.controller.index', function() {
      routerStub.get
        .withArgs('/', 'centrosFormacionCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/centros_formacion/:id', function() {

    it('should route to centrosFormacion.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'centrosFormacionCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/centros_formacion', function() {

    it('should route to centrosFormacion.controller.create', function() {
      routerStub.post
        .withArgs('/', 'centrosFormacionCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/centros_formacion/:id', function() {

    it('should route to centrosFormacion.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'centrosFormacionCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/centros_formacion/:id', function() {

    it('should route to centrosFormacion.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'centrosFormacionCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/centros_formacion/:id', function() {

    it('should route to centrosFormacion.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'centrosFormacionCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
