'use strict';

var app = require('../..');
import request from 'supertest';

var newInasistenciasAprendiz;

describe('InasistenciasAprendiz API:', function() {

  describe('GET /api/inasistencias_aprendiz', function() {
    var inasistenciasAprendizs;

    beforeEach(function(done) {
      request(app)
        .get('/api/inasistencias_aprendiz')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          inasistenciasAprendizs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      inasistenciasAprendizs.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/inasistencias_aprendiz', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/inasistencias_aprendiz')
        .send({
          name: 'New InasistenciasAprendiz',
          info: 'This is the brand new inasistenciasAprendiz!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newInasistenciasAprendiz = res.body;
          done();
        });
    });

    it('should respond with the newly created inasistenciasAprendiz', function() {
      newInasistenciasAprendiz.name.should.equal('New InasistenciasAprendiz');
      newInasistenciasAprendiz.info.should.equal('This is the brand new inasistenciasAprendiz!!!');
    });

  });

  describe('GET /api/inasistencias_aprendiz/:id', function() {
    var inasistenciasAprendiz;

    beforeEach(function(done) {
      request(app)
        .get('/api/inasistencias_aprendiz/' + newInasistenciasAprendiz._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          inasistenciasAprendiz = res.body;
          done();
        });
    });

    afterEach(function() {
      inasistenciasAprendiz = {};
    });

    it('should respond with the requested inasistenciasAprendiz', function() {
      inasistenciasAprendiz.name.should.equal('New InasistenciasAprendiz');
      inasistenciasAprendiz.info.should.equal('This is the brand new inasistenciasAprendiz!!!');
    });

  });

  describe('PUT /api/inasistencias_aprendiz/:id', function() {
    var updatedInasistenciasAprendiz;

    beforeEach(function(done) {
      request(app)
        .put('/api/inasistencias_aprendiz/' + newInasistenciasAprendiz._id)
        .send({
          name: 'Updated InasistenciasAprendiz',
          info: 'This is the updated inasistenciasAprendiz!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedInasistenciasAprendiz = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedInasistenciasAprendiz = {};
    });

    it('should respond with the updated inasistenciasAprendiz', function() {
      updatedInasistenciasAprendiz.name.should.equal('Updated InasistenciasAprendiz');
      updatedInasistenciasAprendiz.info.should.equal('This is the updated inasistenciasAprendiz!!!');
    });

  });

  describe('DELETE /api/inasistencias_aprendiz/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/inasistencias_aprendiz/' + newInasistenciasAprendiz._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when inasistenciasAprendiz does not exist', function(done) {
      request(app)
        .delete('/api/inasistencias_aprendiz/' + newInasistenciasAprendiz._id)
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
