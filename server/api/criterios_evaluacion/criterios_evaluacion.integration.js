'use strict';

var app = require('../..');
import request from 'supertest';

var newCriteriosEvaluacion;

describe('CriteriosEvaluacion API:', function() {

  describe('GET /api/criterios_evaluacion', function() {
    var criteriosEvaluacions;

    beforeEach(function(done) {
      request(app)
        .get('/api/criterios_evaluacion')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          criteriosEvaluacions = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      criteriosEvaluacions.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/criterios_evaluacion', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/criterios_evaluacion')
        .send({
          name: 'New CriteriosEvaluacion',
          info: 'This is the brand new criteriosEvaluacion!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newCriteriosEvaluacion = res.body;
          done();
        });
    });

    it('should respond with the newly created criteriosEvaluacion', function() {
      newCriteriosEvaluacion.name.should.equal('New CriteriosEvaluacion');
      newCriteriosEvaluacion.info.should.equal('This is the brand new criteriosEvaluacion!!!');
    });

  });

  describe('GET /api/criterios_evaluacion/:id', function() {
    var criteriosEvaluacion;

    beforeEach(function(done) {
      request(app)
        .get('/api/criterios_evaluacion/' + newCriteriosEvaluacion._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          criteriosEvaluacion = res.body;
          done();
        });
    });

    afterEach(function() {
      criteriosEvaluacion = {};
    });

    it('should respond with the requested criteriosEvaluacion', function() {
      criteriosEvaluacion.name.should.equal('New CriteriosEvaluacion');
      criteriosEvaluacion.info.should.equal('This is the brand new criteriosEvaluacion!!!');
    });

  });

  describe('PUT /api/criterios_evaluacion/:id', function() {
    var updatedCriteriosEvaluacion;

    beforeEach(function(done) {
      request(app)
        .put('/api/criterios_evaluacion/' + newCriteriosEvaluacion._id)
        .send({
          name: 'Updated CriteriosEvaluacion',
          info: 'This is the updated criteriosEvaluacion!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCriteriosEvaluacion = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCriteriosEvaluacion = {};
    });

    it('should respond with the updated criteriosEvaluacion', function() {
      updatedCriteriosEvaluacion.name.should.equal('Updated CriteriosEvaluacion');
      updatedCriteriosEvaluacion.info.should.equal('This is the updated criteriosEvaluacion!!!');
    });

  });

  describe('DELETE /api/criterios_evaluacion/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/criterios_evaluacion/' + newCriteriosEvaluacion._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when criteriosEvaluacion does not exist', function(done) {
      request(app)
        .delete('/api/criterios_evaluacion/' + newCriteriosEvaluacion._id)
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
