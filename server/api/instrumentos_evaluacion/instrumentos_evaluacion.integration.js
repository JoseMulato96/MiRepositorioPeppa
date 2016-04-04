'use strict';

var app = require('../..');
import request from 'supertest';

var newInstrumentosEvaluacion;

describe('InstrumentosEvaluacion API:', function() {

  describe('GET /api/instrumentos_evaluacion', function() {
    var instrumentosEvaluacions;

    beforeEach(function(done) {
      request(app)
        .get('/api/instrumentos_evaluacion')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          instrumentosEvaluacions = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      instrumentosEvaluacions.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/instrumentos_evaluacion', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/instrumentos_evaluacion')
        .send({
          name: 'New InstrumentosEvaluacion',
          info: 'This is the brand new instrumentosEvaluacion!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newInstrumentosEvaluacion = res.body;
          done();
        });
    });

    it('should respond with the newly created instrumentosEvaluacion', function() {
      newInstrumentosEvaluacion.name.should.equal('New InstrumentosEvaluacion');
      newInstrumentosEvaluacion.info.should.equal('This is the brand new instrumentosEvaluacion!!!');
    });

  });

  describe('GET /api/instrumentos_evaluacion/:id', function() {
    var instrumentosEvaluacion;

    beforeEach(function(done) {
      request(app)
        .get('/api/instrumentos_evaluacion/' + newInstrumentosEvaluacion._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          instrumentosEvaluacion = res.body;
          done();
        });
    });

    afterEach(function() {
      instrumentosEvaluacion = {};
    });

    it('should respond with the requested instrumentosEvaluacion', function() {
      instrumentosEvaluacion.name.should.equal('New InstrumentosEvaluacion');
      instrumentosEvaluacion.info.should.equal('This is the brand new instrumentosEvaluacion!!!');
    });

  });

  describe('PUT /api/instrumentos_evaluacion/:id', function() {
    var updatedInstrumentosEvaluacion;

    beforeEach(function(done) {
      request(app)
        .put('/api/instrumentos_evaluacion/' + newInstrumentosEvaluacion._id)
        .send({
          name: 'Updated InstrumentosEvaluacion',
          info: 'This is the updated instrumentosEvaluacion!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedInstrumentosEvaluacion = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedInstrumentosEvaluacion = {};
    });

    it('should respond with the updated instrumentosEvaluacion', function() {
      updatedInstrumentosEvaluacion.name.should.equal('Updated InstrumentosEvaluacion');
      updatedInstrumentosEvaluacion.info.should.equal('This is the updated instrumentosEvaluacion!!!');
    });

  });

  describe('DELETE /api/instrumentos_evaluacion/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/instrumentos_evaluacion/' + newInstrumentosEvaluacion._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when instrumentosEvaluacion does not exist', function(done) {
      request(app)
        .delete('/api/instrumentos_evaluacion/' + newInstrumentosEvaluacion._id)
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
