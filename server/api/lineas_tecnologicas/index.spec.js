'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var lineasTecnologicasCtrlStub = {
  index: 'lineasTecnologicasCtrl.index',
  show: 'lineasTecnologicasCtrl.show',
  create: 'lineasTecnologicasCtrl.create',
  update: 'lineasTecnologicasCtrl.update',
  destroy: 'lineasTecnologicasCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var lineasTecnologicasIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './lineas_tecnologicas.controller': lineasTecnologicasCtrlStub
});

describe('LineasTecnologicas API Router:', function() {

  it('should return an express router instance', function() {
    lineasTecnologicasIndex.should.equal(routerStub);
  });

  describe('GET /api/lineas_tecnologicas', function() {

    it('should route to lineasTecnologicas.controller.index', function() {
      routerStub.get
        .withArgs('/', 'lineasTecnologicasCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/lineas_tecnologicas/:id', function() {

    it('should route to lineasTecnologicas.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'lineasTecnologicasCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/lineas_tecnologicas', function() {

    it('should route to lineasTecnologicas.controller.create', function() {
      routerStub.post
        .withArgs('/', 'lineasTecnologicasCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/lineas_tecnologicas/:id', function() {

    it('should route to lineasTecnologicas.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'lineasTecnologicasCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/lineas_tecnologicas/:id', function() {

    it('should route to lineasTecnologicas.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'lineasTecnologicasCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/lineas_tecnologicas/:id', function() {

    it('should route to lineasTecnologicas.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'lineasTecnologicasCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
