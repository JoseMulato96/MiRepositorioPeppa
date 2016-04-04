'use strict';

var app = require('../..');
import request from 'supertest';

var newJornadas;

describe('Jornadas API:', function() {

  describe('GET /api/jornadas', function() {
    var jornadass;

    beforeEach(function(done) {
      request(app)
        .get('/api/jornadas')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          jornadass = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      jornadass.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/jornadas', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/jornadas')
        .send({
          name: 'New Jornadas',
          info: 'This is the brand new jornadas!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newJornadas = res.body;
          done();
        });
    });

    it('should respond with the newly created jornadas', function() {
      newJornadas.name.should.equal('New Jornadas');
      newJornadas.info.should.equal('This is the brand new jornadas!!!');
    });

  });

  describe('GET /api/jornadas/:id', function() {
    var jornadas;

    beforeEach(function(done) {
      request(app)
        .get('/api/jornadas/' + newJornadas.id_jornada)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          jornadas = res.body;
          done();
        });
    });

    afterEach(function() {
      jornadas = {};
    });

    it('should respond with the requested jornadas', function() {
      jornadas.name.should.equal('New Jornadas');
      jornadas.info.should.equal('This is the brand new jornadas!!!');
    });

  });

  describe('PUT /api/jornadas/:id', function() {
    var updatedJornadas;

    beforeEach(function(done) {
      request(app)
        .put('/api/jornadas/' + newJornadas.id_jornada)
        .send({
          name: 'Updated Jornadas',
          info: 'This is the updated jornadas!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedJornadas = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedJornadas = {};
    });

    it('should respond with the updated jornadas', function() {
      updatedJornadas.name.should.equal('Updated Jornadas');
      updatedJornadas.info.should.equal('This is the updated jornadas!!!');
    });

  });

  describe('DELETE /api/jornadas/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/jornadas/' + newJornadas.id_jornada)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when jornadas does not exist', function(done) {
      request(app)
        .delete('/api/jornadas/' + newJornadas.id_jornada)
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
