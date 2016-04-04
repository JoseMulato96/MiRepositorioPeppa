'use strict';

var app = require('../..');
import request from 'supertest';

var newConocimientosProceso;

describe('ConocimientosProceso API:', function() {

  describe('GET /api/conocimientos_proceso', function() {
    var conocimientosProcesos;

    beforeEach(function(done) {
      request(app)
        .get('/api/conocimientos_proceso')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          conocimientosProcesos = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      conocimientosProcesos.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/conocimientos_proceso', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/conocimientos_proceso')
        .send({
          name: 'New ConocimientosProceso',
          info: 'This is the brand new conocimientosProceso!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newConocimientosProceso = res.body;
          done();
        });
    });

    it('should respond with the newly created conocimientosProceso', function() {
      newConocimientosProceso.name.should.equal('New ConocimientosProceso');
      newConocimientosProceso.info.should.equal('This is the brand new conocimientosProceso!!!');
    });

  });

  describe('GET /api/conocimientos_proceso/:id', function() {
    var conocimientosProceso;

    beforeEach(function(done) {
      request(app)
        .get('/api/conocimientos_proceso/' + newConocimientosProceso._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          conocimientosProceso = res.body;
          done();
        });
    });

    afterEach(function() {
      conocimientosProceso = {};
    });

    it('should respond with the requested conocimientosProceso', function() {
      conocimientosProceso.name.should.equal('New ConocimientosProceso');
      conocimientosProceso.info.should.equal('This is the brand new conocimientosProceso!!!');
    });

  });

  describe('PUT /api/conocimientos_proceso/:id', function() {
    var updatedConocimientosProceso;

    beforeEach(function(done) {
      request(app)
        .put('/api/conocimientos_proceso/' + newConocimientosProceso._id)
        .send({
          name: 'Updated ConocimientosProceso',
          info: 'This is the updated conocimientosProceso!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedConocimientosProceso = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedConocimientosProceso = {};
    });

    it('should respond with the updated conocimientosProceso', function() {
      updatedConocimientosProceso.name.should.equal('Updated ConocimientosProceso');
      updatedConocimientosProceso.info.should.equal('This is the updated conocimientosProceso!!!');
    });

  });

  describe('DELETE /api/conocimientos_proceso/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/conocimientos_proceso/' + newConocimientosProceso._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when conocimientosProceso does not exist', function(done) {
      request(app)
        .delete('/api/conocimientos_proceso/' + newConocimientosProceso._id)
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
