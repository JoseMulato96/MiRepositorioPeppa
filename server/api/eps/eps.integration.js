'use strict';

var app = require('../..');
import request from 'supertest';

var newEps;

describe('Eps API:', function() {

  describe('GET /api/eps', function() {
    var epss;

    beforeEach(function(done) {
      request(app)
        .get('/api/eps')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          epss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      epss.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/eps', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/eps')
        .send({
          name: 'New Eps',
          info: 'This is the brand new eps!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newEps = res.body;
          done();
        });
    });

    it('should respond with the newly created eps', function() {
      newEps.name.should.equal('New Eps');
      newEps.info.should.equal('This is the brand new eps!!!');
    });

  });

  describe('GET /api/eps/:id', function() {
    var eps;

    beforeEach(function(done) {
      request(app)
        .get('/api/eps/' + newEps.id_eps)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          eps = res.body;
          done();
        });
    });

    afterEach(function() {
      eps = {};
    });

    it('should respond with the requested eps', function() {
      eps.name.should.equal('New Eps');
      eps.info.should.equal('This is the brand new eps!!!');
    });

  });

  describe('PUT /api/eps/:id', function() {
    var updatedEps;

    beforeEach(function(done) {
      request(app)
        .put('/api/eps/' + newEps.id_eps)
        .send({
          name: 'Updated Eps',
          info: 'This is the updated eps!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedEps = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedEps = {};
    });

    it('should respond with the updated eps', function() {
      updatedEps.name.should.equal('Updated Eps');
      updatedEps.info.should.equal('This is the updated eps!!!');
    });

  });

  describe('DELETE /api/eps/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/eps/' + newEps.id_eps)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when eps does not exist', function(done) {
      request(app)
        .delete('/api/eps/' + newEps.id_eps)
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
