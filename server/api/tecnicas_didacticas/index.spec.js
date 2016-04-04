'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var tecnicasDidacticasCtrlStub = {
  index: 'tecnicasDidacticasCtrl.index',
  show: 'tecnicasDidacticasCtrl.show',
  create: 'tecnicasDidacticasCtrl.create',
  update: 'tecnicasDidacticasCtrl.update',
  destroy: 'tecnicasDidacticasCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var tecnicasDidacticasIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './tecnicas_didacticas.controller': tecnicasDidacticasCtrlStub
});

describe('TecnicasDidacticas API Router:', function() {

  it('should return an express router instance', function() {
    tecnicasDidacticasIndex.should.equal(routerStub);
  });

  describe('GET /api/tecnicas_didacticas', function() {

    it('should route to tecnicasDidacticas.controller.index', function() {
      routerStub.get
        .withArgs('/', 'tecnicasDidacticasCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/tecnicas_didacticas/:id', function() {

    it('should route to tecnicasDidacticas.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'tecnicasDidacticasCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/tecnicas_didacticas', function() {

    it('should route to tecnicasDidacticas.controller.create', function() {
      routerStub.post
        .withArgs('/', 'tecnicasDidacticasCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/tecnicas_didacticas/:id', function() {

    it('should route to tecnicasDidacticas.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'tecnicasDidacticasCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/tecnicas_didacticas/:id', function() {

    it('should route to tecnicasDidacticas.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'tecnicasDidacticasCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/tecnicas_didacticas/:id', function() {

    it('should route to tecnicasDidacticas.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'tecnicasDidacticasCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
