'use strict';

var app = require('../..');
import request from 'supertest';

var newFases;

describe('Fases API:', function() {

  describe('GET /api/fases', function() {
    var fasess;

    beforeEach(function(done) {
      request(app)
        .get('/api/fases')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          fasess = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      fasess.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/fases', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/fases')
        .send({
          name: 'New Fases',
          info: 'This is the brand new fases!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newFases = res.body;
          done();
        });
    });

    it('should respond with the newly created fases', function() {
      newFases.name.should.equal('New Fases');
      newFases.info.should.equal('This is the brand new fases!!!');
    });

  });

  describe('GET /api/fases/:id', function() {
    var fases;

    beforeEach(function(done) {
      request(app)
        .get('/api/fases/' + newFases._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          fases = res.body;
          done();
        });
    });

    afterEach(function() {
      fases = {};
    });

    it('should respond with the requested fases', function() {
      fases.name.should.equal('New Fases');
      fases.info.should.equal('This is the brand new fases!!!');
    });

  });

  describe('PUT /api/fases/:id', function() {
    var updatedFases;

    beforeEach(function(done) {
      request(app)
        .put('/api/fases/' + newFases._id)
        .send({
          name: 'Updated Fases',
          info: 'This is the updated fases!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedFases = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedFases = {};
    });

    it('should respond with the updated fases', function() {
      updatedFases.name.should.equal('Updated Fases');
      updatedFases.info.should.equal('This is the updated fases!!!');
    });

  });

  describe('DELETE /api/fases/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/fases/' + newFases._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when fases does not exist', function(done) {
      request(app)
        .delete('/api/fases/' + newFases._id)
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
