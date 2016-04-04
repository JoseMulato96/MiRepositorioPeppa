'use strict';

var app = require('../..');
import request from 'supertest';

var newCompetencias;

describe('Competencias API:', function() {

  describe('GET /api/competencias', function() {
    var competenciass;

    beforeEach(function(done) {
      request(app)
        .get('/api/competencias')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          competenciass = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      competenciass.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/competencias', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/competencias')
        .send({
          name: 'New Competencias',
          info: 'This is the brand new competencias!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newCompetencias = res.body;
          done();
        });
    });

    it('should respond with the newly created competencias', function() {
      newCompetencias.name.should.equal('New Competencias');
      newCompetencias.info.should.equal('This is the brand new competencias!!!');
    });

  });

  describe('GET /api/competencias/:id', function() {
    var competencias;

    beforeEach(function(done) {
      request(app)
        .get('/api/competencias/' + newCompetencias._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          competencias = res.body;
          done();
        });
    });

    afterEach(function() {
      competencias = {};
    });

    it('should respond with the requested competencias', function() {
      competencias.name.should.equal('New Competencias');
      competencias.info.should.equal('This is the brand new competencias!!!');
    });

  });

  describe('PUT /api/competencias/:id', function() {
    var updatedCompetencias;

    beforeEach(function(done) {
      request(app)
        .put('/api/competencias/' + newCompetencias._id)
        .send({
          name: 'Updated Competencias',
          info: 'This is the updated competencias!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCompetencias = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCompetencias = {};
    });

    it('should respond with the updated competencias', function() {
      updatedCompetencias.name.should.equal('Updated Competencias');
      updatedCompetencias.info.should.equal('This is the updated competencias!!!');
    });

  });

  describe('DELETE /api/competencias/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/competencias/' + newCompetencias._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when competencias does not exist', function(done) {
      request(app)
        .delete('/api/competencias/' + newCompetencias._id)
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
