'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var redesTecnologicasCtrlStub = {
  index: 'redesTecnologicasCtrl.index',
  show: 'redesTecnologicasCtrl.show',
  create: 'redesTecnologicasCtrl.create',
  update: 'redesTecnologicasCtrl.update',
  destroy: 'redesTecnologicasCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var redesTecnologicasIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './redes_tecnologicas.controller': redesTecnologicasCtrlStub
});

describe('RedesTecnologicas API Router:', function() {

  it('should return an express router instance', function() {
    redesTecnologicasIndex.should.equal(routerStub);
  });

  describe('GET /api/redes_tecnologicas', function() {

    it('should route to redesTecnologicas.controller.index', function() {
      routerStub.get
        .withArgs('/', 'redesTecnologicasCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/redes_tecnologicas/:id', function() {

    it('should route to redesTecnologicas.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'redesTecnologicasCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/redes_tecnologicas', function() {

    it('should route to redesTecnologicas.controller.create', function() {
      routerStub.post
        .withArgs('/', 'redesTecnologicasCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/redes_tecnologicas/:id', function() {

    it('should route to redesTecnologicas.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'redesTecnologicasCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/redes_tecnologicas/:id', function() {

    it('should route to redesTecnologicas.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'redesTecnologicasCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/redes_tecnologicas/:id', function() {

    it('should route to redesTecnologicas.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'redesTecnologicasCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
