'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var especialidadesCtrlStub = {
  index: 'especialidadesCtrl.index',
  show: 'especialidadesCtrl.show',
  create: 'especialidadesCtrl.create',
  update: 'especialidadesCtrl.update',
  destroy: 'especialidadesCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var especialidadesIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './especialidades.controller': especialidadesCtrlStub
});

describe('Especialidades API Router:', function() {

  it('should return an express router instance', function() {
    especialidadesIndex.should.equal(routerStub);
  });

  describe('GET /api/especialidades', function() {

    it('should route to especialidades.controller.index', function() {
      routerStub.get
        .withArgs('/', 'especialidadesCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/especialidades/:id', function() {

    it('should route to especialidades.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'especialidadesCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/especialidades', function() {

    it('should route to especialidades.controller.create', function() {
      routerStub.post
        .withArgs('/', 'especialidadesCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/especialidades/:id', function() {

    it('should route to especialidades.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'especialidadesCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/especialidades/:id', function() {

    it('should route to especialidades.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'especialidadesCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/especialidades/:id', function() {

    it('should route to especialidades.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'especialidadesCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
