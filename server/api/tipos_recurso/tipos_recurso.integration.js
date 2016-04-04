'use strict';

var app = require('../..');
import request from 'supertest';

var newTiposRecurso;

describe('TiposRecurso API:', function() {

  describe('GET /api/tipos_recurso', function() {
    var tiposRecursos;

    beforeEach(function(done) {
      request(app)
        .get('/api/tipos_recurso')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          tiposRecursos = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      tiposRecursos.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/tipos_recurso', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/tipos_recurso')
        .send({
          name: 'New TiposRecurso',
          info: 'This is the brand new tiposRecurso!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newTiposRecurso = res.body;
          done();
        });
    });

    it('should respond with the newly created tiposRecurso', function() {
      newTiposRecurso.name.should.equal('New TiposRecurso');
      newTiposRecurso.info.should.equal('This is the brand new tiposRecurso!!!');
    });

  });

  describe('GET /api/tipos_recurso/:id', function() {
    var tiposRecurso;

    beforeEach(function(done) {
      request(app)
        .get('/api/tipos_recurso/' + newTiposRecurso._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          tiposRecurso = res.body;
          done();
        });
    });

    afterEach(function() {
      tiposRecurso = {};
    });

    it('should respond with the requested tiposRecurso', function() {
      tiposRecurso.name.should.equal('New TiposRecurso');
      tiposRecurso.info.should.equal('This is the brand new tiposRecurso!!!');
    });

  });

  describe('PUT /api/tipos_recurso/:id', function() {
    var updatedTiposRecurso;

    beforeEach(function(done) {
      request(app)
        .put('/api/tipos_recurso/' + newTiposRecurso._id)
        .send({
          name: 'Updated TiposRecurso',
          info: 'This is the updated tiposRecurso!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTiposRecurso = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTiposRecurso = {};
    });

    it('should respond with the updated tiposRecurso', function() {
      updatedTiposRecurso.name.should.equal('Updated TiposRecurso');
      updatedTiposRecurso.info.should.equal('This is the updated tiposRecurso!!!');
    });

  });

  describe('DELETE /api/tipos_recurso/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/tipos_recurso/' + newTiposRecurso._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when tiposRecurso does not exist', function(done) {
      request(app)
        .delete('/api/tipos_recurso/' + newTiposRecurso._id)
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
