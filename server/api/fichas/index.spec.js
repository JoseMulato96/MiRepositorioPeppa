'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var fichasCtrlStub = {
  index: 'fichasCtrl.index',
  show: 'fichasCtrl.show',
  create: 'fichasCtrl.create',
  update: 'fichasCtrl.update',
  destroy: 'fichasCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var fichasIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './fichas.controller': fichasCtrlStub
});

describe('Fichas API Router:', function() {

  it('should return an express router instance', function() {
    fichasIndex.should.equal(routerStub);
  });

  describe('GET /api/ficha', function() {

    it('should route to fichas.controller.index', function() {
      routerStub.get
        .withArgs('/', 'fichasCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/ficha/:id', function() {

    it('should route to fichas.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'fichasCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/ficha', function() {

    it('should route to fichas.controller.create', function() {
      routerStub.post
        .withArgs('/', 'fichasCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/ficha/:id', function() {

    it('should route to fichas.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'fichasCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/ficha/:id', function() {

    it('should route to fichas.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'fichasCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/ficha/:id', function() {

    it('should route to fichas.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'fichasCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
