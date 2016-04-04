'use strict';

var app = require('../..');
import request from 'supertest';

var newPaises;

describe('Paises API:', function() {

  describe('GET /api/paises', function() {
    var paisess;

    beforeEach(function(done) {
      request(app)
        .get('/api/paises')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          paisess = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      paisess.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/paises', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/paises')
        .send({
          name: 'New Paises',
          info: 'This is the brand new paises!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newPaises = res.body;
          done();
        });
    });

    it('should respond with the newly created paises', function() {
      newPaises.name.should.equal('New Paises');
      newPaises.info.should.equal('This is the brand new paises!!!');
    });

  });

  describe('GET /api/paises/:id', function() {
    var paises;

    beforeEach(function(done) {
      request(app)
        .get('/api/paises/' + newPaises.id_paises)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          paises = res.body;
          done();
        });
    });

    afterEach(function() {
      paises = {};
    });

    it('should respond with the requested paises', function() {
      paises.name.should.equal('New Paises');
      paises.info.should.equal('This is the brand new paises!!!');
    });

  });

  describe('PUT /api/paises/:id', function() {
    var updatedPaises;

    beforeEach(function(done) {
      request(app)
        .put('/api/paises/' + newPaises.id_paises)
        .send({
          name: 'Updated Paises',
          info: 'This is the updated paises!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedPaises = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPaises = {};
    });

    it('should respond with the updated paises', function() {
      updatedPaises.name.should.equal('Updated Paises');
      updatedPaises.info.should.equal('This is the updated paises!!!');
    });

  });

  describe('DELETE /api/paises/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/paises/' + newPaises.id_paises)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when paises does not exist', function(done) {
      request(app)
        .delete('/api/paises/' + newPaises.id_paises)
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
