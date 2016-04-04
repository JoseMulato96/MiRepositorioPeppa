'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var proyectosCtrlStub = {
  index: 'proyectosCtrl.index',
  show: 'proyectosCtrl.show',
  create: 'proyectosCtrl.create',
  update: 'proyectosCtrl.update',
  destroy: 'proyectosCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var proyectosIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './proyectos.controller': proyectosCtrlStub
});

describe('Proyectos API Router:', function() {

  it('should return an express router instance', function() {
    proyectosIndex.should.equal(routerStub);
  });

  describe('GET /api/proyectos', function() {

    it('should route to proyectos.controller.index', function() {
      routerStub.get
        .withArgs('/', 'proyectosCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/proyectos/:id', function() {

    it('should route to proyectos.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'proyectosCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/proyectos', function() {

    it('should route to proyectos.controller.create', function() {
      routerStub.post
        .withArgs('/', 'proyectosCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/proyectos/:id', function() {

    it('should route to proyectos.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'proyectosCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/proyectos/:id', function() {

    it('should route to proyectos.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'proyectosCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/proyectos/:id', function() {

    it('should route to proyectos.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'proyectosCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
