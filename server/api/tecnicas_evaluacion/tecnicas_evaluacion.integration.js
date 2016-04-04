'use strict';

var app = require('../..');
import request from 'supertest';

var newTecnicasEvaluacion;

describe('TecnicasEvaluacion API:', function() {

  describe('GET /api/tecnicas_evaluacion', function() {
    var tecnicasEvaluacions;

    beforeEach(function(done) {
      request(app)
        .get('/api/tecnicas_evaluacion')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          tecnicasEvaluacions = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      tecnicasEvaluacions.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/tecnicas_evaluacion', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/tecnicas_evaluacion')
        .send({
          name: 'New TecnicasEvaluacion',
          info: 'This is the brand new tecnicasEvaluacion!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newTecnicasEvaluacion = res.body;
          done();
        });
    });

    it('should respond with the newly created tecnicasEvaluacion', function() {
      newTecnicasEvaluacion.name.should.equal('New TecnicasEvaluacion');
      newTecnicasEvaluacion.info.should.equal('This is the brand new tecnicasEvaluacion!!!');
    });

  });

  describe('GET /api/tecnicas_evaluacion/:id', function() {
    var tecnicasEvaluacion;

    beforeEach(function(done) {
      request(app)
        .get('/api/tecnicas_evaluacion/' + newTecnicasEvaluacion._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          tecnicasEvaluacion = res.body;
          done();
        });
    });

    afterEach(function() {
      tecnicasEvaluacion = {};
    });

    it('should respond with the requested tecnicasEvaluacion', function() {
      tecnicasEvaluacion.name.should.equal('New TecnicasEvaluacion');
      tecnicasEvaluacion.info.should.equal('This is the brand new tecnicasEvaluacion!!!');
    });

  });

  describe('PUT /api/tecnicas_evaluacion/:id', function() {
    var updatedTecnicasEvaluacion;

    beforeEach(function(done) {
      request(app)
        .put('/api/tecnicas_evaluacion/' + newTecnicasEvaluacion._id)
        .send({
          name: 'Updated TecnicasEvaluacion',
          info: 'This is the updated tecnicasEvaluacion!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTecnicasEvaluacion = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTecnicasEvaluacion = {};
    });

    it('should respond with the updated tecnicasEvaluacion', function() {
      updatedTecnicasEvaluacion.name.should.equal('Updated TecnicasEvaluacion');
      updatedTecnicasEvaluacion.info.should.equal('This is the updated tecnicasEvaluacion!!!');
    });

  });

  describe('DELETE /api/tecnicas_evaluacion/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/tecnicas_evaluacion/' + newTecnicasEvaluacion._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when tecnicasEvaluacion does not exist', function(done) {
      request(app)
        .delete('/api/tecnicas_evaluacion/' + newTecnicasEvaluacion._id)
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
