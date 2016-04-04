'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var tiposInstructorCtrlStub = {
  index: 'tiposInstructorCtrl.index',
  show: 'tiposInstructorCtrl.show',
  create: 'tiposInstructorCtrl.create',
  update: 'tiposInstructorCtrl.update',
  destroy: 'tiposInstructorCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var tiposInstructorIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './tipos_instructor.controller': tiposInstructorCtrlStub
});

describe('TiposInstructor API Router:', function() {

  it('should return an express router instance', function() {
    tiposInstructorIndex.should.equal(routerStub);
  });

  describe('GET /api/tipos_instuctor', function() {

    it('should route to tiposInstructor.controller.index', function() {
      routerStub.get
        .withArgs('/', 'tiposInstructorCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/tipos_instuctor/:id', function() {

    it('should route to tiposInstructor.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'tiposInstructorCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/tipos_instuctor', function() {

    it('should route to tiposInstructor.controller.create', function() {
      routerStub.post
        .withArgs('/', 'tiposInstructorCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/tipos_instuctor/:id', function() {

    it('should route to tiposInstructor.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'tiposInstructorCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/tipos_instuctor/:id', function() {

    it('should route to tiposInstructor.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'tiposInstructorCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/tipos_instuctor/:id', function() {

    it('should route to tiposInstructor.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'tiposInstructorCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
