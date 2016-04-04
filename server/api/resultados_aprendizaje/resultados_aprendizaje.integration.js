'use strict';

var app = require('../..');
import request from 'supertest';

var newResultadosAprendizaje;

describe('ResultadosAprendizaje API:', function() {

  describe('GET /api/resultados_aprendizaje', function() {
    var resultadosAprendizajes;

    beforeEach(function(done) {
      request(app)
        .get('/api/resultados_aprendizaje')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          resultadosAprendizajes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      resultadosAprendizajes.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/resultados_aprendizaje', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/resultados_aprendizaje')
        .send({
          name: 'New ResultadosAprendizaje',
          info: 'This is the brand new resultadosAprendizaje!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newResultadosAprendizaje = res.body;
          done();
        });
    });

    it('should respond with the newly created resultadosAprendizaje', function() {
      newResultadosAprendizaje.name.should.equal('New ResultadosAprendizaje');
      newResultadosAprendizaje.info.should.equal('This is the brand new resultadosAprendizaje!!!');
    });

  });

  describe('GET /api/resultados_aprendizaje/:id', function() {
    var resultadosAprendizaje;

    beforeEach(function(done) {
      request(app)
        .get('/api/resultados_aprendizaje/' + newResultadosAprendizaje._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          resultadosAprendizaje = res.body;
          done();
        });
    });

    afterEach(function() {
      resultadosAprendizaje = {};
    });

    it('should respond with the requested resultadosAprendizaje', function() {
      resultadosAprendizaje.name.should.equal('New ResultadosAprendizaje');
      resultadosAprendizaje.info.should.equal('This is the brand new resultadosAprendizaje!!!');
    });

  });

  describe('PUT /api/resultados_aprendizaje/:id', function() {
    var updatedResultadosAprendizaje;

    beforeEach(function(done) {
      request(app)
        .put('/api/resultados_aprendizaje/' + newResultadosAprendizaje._id)
        .send({
          name: 'Updated ResultadosAprendizaje',
          info: 'This is the updated resultadosAprendizaje!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedResultadosAprendizaje = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedResultadosAprendizaje = {};
    });

    it('should respond with the updated resultadosAprendizaje', function() {
      updatedResultadosAprendizaje.name.should.equal('Updated ResultadosAprendizaje');
      updatedResultadosAprendizaje.info.should.equal('This is the updated resultadosAprendizaje!!!');
    });

  });

  describe('DELETE /api/resultados_aprendizaje/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/resultados_aprendizaje/' + newResultadosAprendizaje._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when resultadosAprendizaje does not exist', function(done) {
      request(app)
        .delete('/api/resultados_aprendizaje/' + newResultadosAprendizaje._id)
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
