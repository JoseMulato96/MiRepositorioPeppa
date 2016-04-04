'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var novedadesInstructorCtrlStub = {
  index: 'novedadesInstructorCtrl.index',
  show: 'novedadesInstructorCtrl.show',
  create: 'novedadesInstructorCtrl.create',
  update: 'novedadesInstructorCtrl.update',
  destroy: 'novedadesInstructorCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var novedadesInstructorIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './novedades_instructor.controller': novedadesInstructorCtrlStub
});

describe('NovedadesInstructor API Router:', function() {

  it('should return an express router instance', function() {
    novedadesInstructorIndex.should.equal(routerStub);
  });

  describe('GET /api/novedades_instructor', function() {

    it('should route to novedadesInstructor.controller.index', function() {
      routerStub.get
        .withArgs('/', 'novedadesInstructorCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/novedades_instructor/:id', function() {

    it('should route to novedadesInstructor.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'novedadesInstructorCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/novedades_instructor', function() {

    it('should route to novedadesInstructor.controller.create', function() {
      routerStub.post
        .withArgs('/', 'novedadesInstructorCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/novedades_instructor/:id', function() {

    it('should route to novedadesInstructor.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'novedadesInstructorCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/novedades_instructor/:id', function() {

    it('should route to novedadesInstructor.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'novedadesInstructorCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/novedades_instructor/:id', function() {

    it('should route to novedadesInstructor.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'novedadesInstructorCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
