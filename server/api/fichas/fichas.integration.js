'use strict';

var app = require('../..');
import request from 'supertest';

var newFichas;

describe('Fichas API:', function() {

  describe('GET /api/ficha', function() {
    var fichass;

    beforeEach(function(done) {
      request(app)
        .get('/api/ficha')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          fichass = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      fichass.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/ficha', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/ficha')
        .send({
          name: 'New Fichas',
          info: 'This is the brand new fichas!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newFichas = res.body;
          done();
        });
    });

    it('should respond with the newly created fichas', function() {
      newFichas.name.should.equal('New Fichas');
      newFichas.info.should.equal('This is the brand new fichas!!!');
    });

  });

  describe('GET /api/ficha/:id', function() {
    var fichas;

    beforeEach(function(done) {
      request(app)
        .get('/api/ficha/' + newFichas._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          fichas = res.body;
          done();
        });
    });

    afterEach(function() {
      fichas = {};
    });

    it('should respond with the requested fichas', function() {
      fichas.name.should.equal('New Fichas');
      fichas.info.should.equal('This is the brand new fichas!!!');
    });

  });

  describe('PUT /api/ficha/:id', function() {
    var updatedFichas;

    beforeEach(function(done) {
      request(app)
        .put('/api/ficha/' + newFichas._id)
        .send({
          name: 'Updated Fichas',
          info: 'This is the updated fichas!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedFichas = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedFichas = {};
    });

    it('should respond with the updated fichas', function() {
      updatedFichas.name.should.equal('Updated Fichas');
      updatedFichas.info.should.equal('This is the updated fichas!!!');
    });

  });

  describe('DELETE /api/ficha/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/ficha/' + newFichas._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when fichas does not exist', function(done) {
      request(app)
        .delete('/api/ficha/' + newFichas._id)
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
