'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var nivelesFormacionCtrlStub = {
  index: 'nivelesFormacionCtrl.index',
  show: 'nivelesFormacionCtrl.show',
  create: 'nivelesFormacionCtrl.create',
  update: 'nivelesFormacionCtrl.update',
  destroy: 'nivelesFormacionCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var nivelesFormacionIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './niveles_formacion.controller': nivelesFormacionCtrlStub
});

describe('NivelesFormacion API Router:', function() {

  it('should return an express router instance', function() {
    nivelesFormacionIndex.should.equal(routerStub);
  });

  describe('GET /api/niveles_formacion', function() {

    it('should route to nivelesFormacion.controller.index', function() {
      routerStub.get
        .withArgs('/', 'nivelesFormacionCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/niveles_formacion/:id', function() {

    it('should route to nivelesFormacion.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'nivelesFormacionCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/niveles_formacion', function() {

    it('should route to nivelesFormacion.controller.create', function() {
      routerStub.post
        .withArgs('/', 'nivelesFormacionCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/niveles_formacion/:id', function() {

    it('should route to nivelesFormacion.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'nivelesFormacionCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/niveles_formacion/:id', function() {

    it('should route to nivelesFormacion.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'nivelesFormacionCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/niveles_formacion/:id', function() {

    it('should route to nivelesFormacion.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'nivelesFormacionCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
