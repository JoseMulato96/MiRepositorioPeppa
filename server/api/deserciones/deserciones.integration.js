'use strict';

var app = require('../..');
import request from 'supertest';

var newDeserciones;

describe('Deserciones API:', function() {

  describe('GET /api/deserciones', function() {
    var desercioness;

    beforeEach(function(done) {
      request(app)
        .get('/api/deserciones')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          desercioness = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      desercioness.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/deserciones', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/deserciones')
        .send({
          name: 'New Deserciones',
          info: 'This is the brand new deserciones!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newDeserciones = res.body;
          done();
        });
    });

    it('should respond with the newly created deserciones', function() {
      newDeserciones.name.should.equal('New Deserciones');
      newDeserciones.info.should.equal('This is the brand new deserciones!!!');
    });

  });

  describe('GET /api/deserciones/:id', function() {
    var deserciones;

    beforeEach(function(done) {
      request(app)
        .get('/api/deserciones/' + newDeserciones.id_desercion)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          deserciones = res.body;
          done();
        });
    });

    afterEach(function() {
      deserciones = {};
    });

    it('should respond with the requested deserciones', function() {
      deserciones.name.should.equal('New Deserciones');
      deserciones.info.should.equal('This is the brand new deserciones!!!');
    });

  });

  describe('PUT /api/deserciones/:id', function() {
    var updatedDeserciones;

    beforeEach(function(done) {
      request(app)
        .put('/api/deserciones/' + newDeserciones.id_desercion)
        .send({
          name: 'Updated Deserciones',
          info: 'This is the updated deserciones!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedDeserciones = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedDeserciones = {};
    });

    it('should respond with the updated deserciones', function() {
      updatedDeserciones.name.should.equal('Updated Deserciones');
      updatedDeserciones.info.should.equal('This is the updated deserciones!!!');
    });

  });

  describe('DELETE /api/deserciones/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/deserciones/' + newDeserciones.id_desercion)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when deserciones does not exist', function(done) {
      request(app)
        .delete('/api/deserciones/' + newDeserciones.id_desercion)
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
