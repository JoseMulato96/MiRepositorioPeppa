'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var detallesSabanasHorariosCtrlStub = {
  index: 'detallesSabanasHorariosCtrl.index',
  show: 'detallesSabanasHorariosCtrl.show',
  create: 'detallesSabanasHorariosCtrl.create',
  update: 'detallesSabanasHorariosCtrl.update',
  destroy: 'detallesSabanasHorariosCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var detallesSabanasHorariosIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './detalles_sabanas_horarios.controller': detallesSabanasHorariosCtrlStub
});

describe('DetallesSabanasHorarios API Router:', function() {

  it('should return an express router instance', function() {
    detallesSabanasHorariosIndex.should.equal(routerStub);
  });

  describe('GET /api/detalles_sabanas_horarios', function() {

    it('should route to detallesSabanasHorarios.controller.index', function() {
      routerStub.get
        .withArgs('/', 'detallesSabanasHorariosCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/detalles_sabanas_horarios/:id', function() {

    it('should route to detallesSabanasHorarios.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'detallesSabanasHorariosCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/detalles_sabanas_horarios', function() {

    it('should route to detallesSabanasHorarios.controller.create', function() {
      routerStub.post
        .withArgs('/', 'detallesSabanasHorariosCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/detalles_sabanas_horarios/:id', function() {

    it('should route to detallesSabanasHorarios.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'detallesSabanasHorariosCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/detalles_sabanas_horarios/:id', function() {

    it('should route to detallesSabanasHorarios.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'detallesSabanasHorariosCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/detalles_sabanas_horarios/:id', function() {

    it('should route to detallesSabanasHorarios.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'detallesSabanasHorariosCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
