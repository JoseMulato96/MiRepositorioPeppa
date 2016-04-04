'use strict';

var app = require('../..');
import request from 'supertest';

var newEstilosAprendizaje;

describe('EstilosAprendizaje API:', function() {

  describe('GET /api/activiades_aprendizaje', function() {
    var estilosAprendizajes;

    beforeEach(function(done) {
      request(app)
        .get('/api/activiades_aprendizaje')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          estilosAprendizajes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      estilosAprendizajes.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/activiades_aprendizaje', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/activiades_aprendizaje')
        .send({
          name: 'New EstilosAprendizaje',
          info: 'This is the brand new estilosAprendizaje!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newEstilosAprendizaje = res.body;
          done();
        });
    });

    it('should respond with the newly created estilosAprendizaje', function() {
      newEstilosAprendizaje.name.should.equal('New EstilosAprendizaje');
      newEstilosAprendizaje.info.should.equal('This is the brand new estilosAprendizaje!!!');
    });

  });

  describe('GET /api/activiades_aprendizaje/:id', function() {
    var estilosAprendizaje;

    beforeEach(function(done) {
      request(app)
        .get('/api/activiades_aprendizaje/' + newEstilosAprendizaje.id_estilo_aprendizaje)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          estilosAprendizaje = res.body;
          done();
        });
    });

    afterEach(function() {
      estilosAprendizaje = {};
    });

    it('should respond with the requested estilosAprendizaje', function() {
      estilosAprendizaje.name.should.equal('New EstilosAprendizaje');
      estilosAprendizaje.info.should.equal('This is the brand new estilosAprendizaje!!!');
    });

  });

  describe('PUT /api/activiades_aprendizaje/:id', function() {
    var updatedEstilosAprendizaje;

    beforeEach(function(done) {
      request(app)
        .put('/api/activiades_aprendizaje/' + newEstilosAprendizaje.id_estilo_aprendizaje)
        .send({
          name: 'Updated EstilosAprendizaje',
          info: 'This is the updated estilosAprendizaje!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedEstilosAprendizaje = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedEstilosAprendizaje = {};
    });

    it('should respond with the updated estilosAprendizaje', function() {
      updatedEstilosAprendizaje.name.should.equal('Updated EstilosAprendizaje');
      updatedEstilosAprendizaje.info.should.equal('This is the updated estilosAprendizaje!!!');
    });

  });

  describe('DELETE /api/activiades_aprendizaje/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/activiades_aprendizaje/' + newEstilosAprendizaje.id_estilo_aprendizaje)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when estilosAprendizaje does not exist', function(done) {
      request(app)
        .delete('/api/activiades_aprendizaje/' + newEstilosAprendizaje.id_estilo_aprendizaje)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
