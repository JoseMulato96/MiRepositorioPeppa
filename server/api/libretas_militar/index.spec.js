'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var libretasMilitarCtrlStub = {
  index: 'libretasMilitarCtrl.index',
  show: 'libretasMilitarCtrl.show',
  create: 'libretasMilitarCtrl.create',
  update: 'libretasMilitarCtrl.update',
  destroy: 'libretasMilitarCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var libretasMilitarIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './libretas_militar.controller': libretasMilitarCtrlStub
});

describe('LibretasMilitar API Router:', function() {

  it('should return an express router instance', function() {
    libretasMilitarIndex.should.equal(routerStub);
  });

  describe('GET /api/libretas_militar', function() {

    it('should route to libretasMilitar.controller.index', function() {
      routerStub.get
        .withArgs('/', 'libretasMilitarCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/libretas_militar/:id', function() {

    it('should route to libretasMilitar.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'libretasMilitarCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/libretas_militar', function() {

    it('should route to libretasMilitar.controller.create', function() {
      routerStub.post
        .withArgs('/', 'libretasMilitarCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/libretas_militar/:id', function() {

    it('should route to libretasMilitar.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'libretasMilitarCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/libretas_militar/:id', function() {

    it('should route to libretasMilitar.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'libretasMilitarCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/libretas_militar/:id', function() {

    it('should route to libretasMilitar.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'libretasMilitarCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
