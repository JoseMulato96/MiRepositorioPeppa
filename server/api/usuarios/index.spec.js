'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var usuariosCtrlStub = {
  index: 'usuariosCtrl.index',
  show: 'usuariosCtrl.show',
  create: 'usuariosCtrl.create',
  update: 'usuariosCtrl.update',
  destroy: 'usuariosCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var usuariosIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './usuarios.controller': usuariosCtrlStub
});

describe('Usuarios API Router:', function() {

  it('should return an express router instance', function() {
    usuariosIndex.should.equal(routerStub);
  });

  describe('GET /api/usuarios', function() {

    it('should route to usuarios.controller.index', function() {
      routerStub.get
        .withArgs('/', 'usuariosCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/usuarios/:id', function() {

    it('should route to usuarios.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'usuariosCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/usuarios', function() {

    it('should route to usuarios.controller.create', function() {
      routerStub.post
        .withArgs('/', 'usuariosCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/usuarios/:id', function() {

    it('should route to usuarios.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'usuariosCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/usuarios/:id', function() {

    it('should route to usuarios.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'usuariosCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/usuarios/:id', function() {

    it('should route to usuarios.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'usuariosCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
