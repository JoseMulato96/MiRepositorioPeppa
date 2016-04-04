'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var ambientesFormacionCtrlStub = {
  index: 'ambientesFormacionCtrl.index',
  show: 'ambientesFormacionCtrl.show',
  create: 'ambientesFormacionCtrl.create',
  update: 'ambientesFormacionCtrl.update',
  destroy: 'ambientesFormacionCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var ambientesFormacionIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './ambientes_formacion.controller': ambientesFormacionCtrlStub
});

describe('AmbientesFormacion API Router:', function() {

  it('should return an express router instance', function() {
    ambientesFormacionIndex.should.equal(routerStub);
  });

  describe('GET /api/ambientes_formacion', function() {

    it('should route to ambientesFormacion.controller.index', function() {
      routerStub.get
        .withArgs('/', 'ambientesFormacionCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/ambientes_formacion/:id', function() {

    it('should route to ambientesFormacion.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'ambientesFormacionCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/ambientes_formacion', function() {

    it('should route to ambientesFormacion.controller.create', function() {
      routerStub.post
        .withArgs('/', 'ambientesFormacionCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/ambientes_formacion/:id', function() {

    it('should route to ambientesFormacion.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'ambientesFormacionCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/ambientes_formacion/:id', function() {

    it('should route to ambientesFormacion.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'ambientesFormacionCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/ambientes_formacion/:id', function() {

    it('should route to ambientesFormacion.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'ambientesFormacionCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
