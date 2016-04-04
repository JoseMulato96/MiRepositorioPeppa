'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var modalidadesFormacionCtrlStub = {
  index: 'modalidadesFormacionCtrl.index',
  show: 'modalidadesFormacionCtrl.show',
  create: 'modalidadesFormacionCtrl.create',
  update: 'modalidadesFormacionCtrl.update',
  destroy: 'modalidadesFormacionCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var modalidadesFormacionIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './modalidades_formacion.controller': modalidadesFormacionCtrlStub
});

describe('ModalidadesFormacion API Router:', function() {

  it('should return an express router instance', function() {
    modalidadesFormacionIndex.should.equal(routerStub);
  });

  describe('GET /api/modalidades_formacion', function() {

    it('should route to modalidadesFormacion.controller.index', function() {
      routerStub.get
        .withArgs('/', 'modalidadesFormacionCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/modalidades_formacion/:id', function() {

    it('should route to modalidadesFormacion.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'modalidadesFormacionCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/modalidades_formacion', function() {

    it('should route to modalidadesFormacion.controller.create', function() {
      routerStub.post
        .withArgs('/', 'modalidadesFormacionCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/modalidades_formacion/:id', function() {

    it('should route to modalidadesFormacion.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'modalidadesFormacionCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/modalidades_formacion/:id', function() {

    it('should route to modalidadesFormacion.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'modalidadesFormacionCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/modalidades_formacion/:id', function() {

    it('should route to modalidadesFormacion.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'modalidadesFormacionCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
