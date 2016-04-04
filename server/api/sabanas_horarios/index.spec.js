'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var sabanasHorariosCtrlStub = {
  index: 'sabanasHorariosCtrl.index',
  show: 'sabanasHorariosCtrl.show',
  create: 'sabanasHorariosCtrl.create',
  update: 'sabanasHorariosCtrl.update',
  destroy: 'sabanasHorariosCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var sabanasHorariosIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './sabanas_horarios.controller': sabanasHorariosCtrlStub
});

describe('SabanasHorarios API Router:', function() {

  it('should return an express router instance', function() {
    sabanasHorariosIndex.should.equal(routerStub);
  });

  describe('GET /api/sabanas_horarios', function() {

    it('should route to sabanasHorarios.controller.index', function() {
      routerStub.get
        .withArgs('/', 'sabanasHorariosCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/sabanas_horarios/:id', function() {

    it('should route to sabanasHorarios.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'sabanasHorariosCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/sabanas_horarios', function() {

    it('should route to sabanasHorarios.controller.create', function() {
      routerStub.post
        .withArgs('/', 'sabanasHorariosCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/sabanas_horarios/:id', function() {

    it('should route to sabanasHorarios.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'sabanasHorariosCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/sabanas_horarios/:id', function() {

    it('should route to sabanasHorarios.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'sabanasHorariosCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/sabanas_horarios/:id', function() {

    it('should route to sabanasHorarios.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'sabanasHorariosCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
