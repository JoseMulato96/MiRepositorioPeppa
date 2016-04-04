'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var estilosAprendizajeCtrlStub = {
  index: 'estilosAprendizajeCtrl.index',
  show: 'estilosAprendizajeCtrl.show',
  create: 'estilosAprendizajeCtrl.create',
  update: 'estilosAprendizajeCtrl.update',
  destroy: 'estilosAprendizajeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var estilosAprendizajeIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './estilos_aprendizaje.controller': estilosAprendizajeCtrlStub
});

describe('EstilosAprendizaje API Router:', function() {

  it('should return an express router instance', function() {
    estilosAprendizajeIndex.should.equal(routerStub);
  });

  describe('GET /api/estilos_aprendizaje', function() {

    it('should route to estilosAprendizaje.controller.index', function() {
      routerStub.get
        .withArgs('/', 'estilosAprendizajeCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/estilos_aprendizaje/:id', function() {

    it('should route to estilosAprendizaje.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'estilosAprendizajeCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/estilos_aprendizaje', function() {

    it('should route to estilosAprendizaje.controller.create', function() {
      routerStub.post
        .withArgs('/', 'estilosAprendizajeCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/estilos_aprendizaje/:id', function() {

    it('should route to estilosAprendizaje.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'estilosAprendizajeCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/estilos_aprendizaje/:id', function() {

    it('should route to estilosAprendizaje.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'estilosAprendizajeCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/estilos_aprendizaje/:id', function() {

    it('should route to estilosAprendizaje.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'estilosAprendizajeCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
