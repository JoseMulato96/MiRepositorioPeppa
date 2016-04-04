'use strict';

var app = require('../..');
import request from 'supertest';

var newFuenteRecursos;

describe('FuenteRecursos API:', function() {

  describe('GET /api/fuente_recursos', function() {
    var fuenteRecursoss;

    beforeEach(function(done) {
      request(app)
        .get('/api/fuente_recursos')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          fuenteRecursoss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      fuenteRecursoss.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/fuente_recursos', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/fuente_recursos')
        .send({
          name: 'New FuenteRecursos',
          info: 'This is the brand new fuenteRecursos!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newFuenteRecursos = res.body;
          done();
        });
    });

    it('should respond with the newly created fuenteRecursos', function() {
      newFuenteRecursos.name.should.equal('New FuenteRecursos');
      newFuenteRecursos.info.should.equal('This is the brand new fuenteRecursos!!!');
    });

  });

  describe('GET /api/fuente_recursos/:id', function() {
    var fuenteRecursos;

    beforeEach(function(done) {
      request(app)
        .get('/api/fuente_recursos/' + newFuenteRecursos._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          fuenteRecursos = res.body;
          done();
        });
    });

    afterEach(function() {
      fuenteRecursos = {};
    });

    it('should respond with the requested fuenteRecursos', function() {
      fuenteRecursos.name.should.equal('New FuenteRecursos');
      fuenteRecursos.info.should.equal('This is the brand new fuenteRecursos!!!');
    });

  });

  describe('PUT /api/fuente_recursos/:id', function() {
    var updatedFuenteRecursos;

    beforeEach(function(done) {
      request(app)
        .put('/api/fuente_recursos/' + newFuenteRecursos._id)
        .send({
          name: 'Updated FuenteRecursos',
          info: 'This is the updated fuenteRecursos!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedFuenteRecursos = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedFuenteRecursos = {};
    });

    it('should respond with the updated fuenteRecursos', function() {
      updatedFuenteRecursos.name.should.equal('Updated FuenteRecursos');
      updatedFuenteRecursos.info.should.equal('This is the updated fuenteRecursos!!!');
    });

  });

  describe('DELETE /api/fuente_recursos/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/fuente_recursos/' + newFuenteRecursos._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when fuenteRecursos does not exist', function(done) {
      request(app)
        .delete('/api/fuente_recursos/' + newFuenteRecursos._id)
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
