'use strict';

var app = require('../..');
import request from 'supertest';

var newEvidencias;

describe('Evidencias API:', function() {

  describe('GET /api/evidencias', function() {
    var evidenciass;

    beforeEach(function(done) {
      request(app)
        .get('/api/evidencias')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          evidenciass = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      evidenciass.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/evidencias', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/evidencias')
        .send({
          name: 'New Evidencias',
          info: 'This is the brand new evidencias!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newEvidencias = res.body;
          done();
        });
    });

    it('should respond with the newly created evidencias', function() {
      newEvidencias.name.should.equal('New Evidencias');
      newEvidencias.info.should.equal('This is the brand new evidencias!!!');
    });

  });

  describe('GET /api/evidencias/:id', function() {
    var evidencias;

    beforeEach(function(done) {
      request(app)
        .get('/api/evidencias/' + newEvidencias._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          evidencias = res.body;
          done();
        });
    });

    afterEach(function() {
      evidencias = {};
    });

    it('should respond with the requested evidencias', function() {
      evidencias.name.should.equal('New Evidencias');
      evidencias.info.should.equal('This is the brand new evidencias!!!');
    });

  });

  describe('PUT /api/evidencias/:id', function() {
    var updatedEvidencias;

    beforeEach(function(done) {
      request(app)
        .put('/api/evidencias/' + newEvidencias._id)
        .send({
          name: 'Updated Evidencias',
          info: 'This is the updated evidencias!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedEvidencias = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedEvidencias = {};
    });

    it('should respond with the updated evidencias', function() {
      updatedEvidencias.name.should.equal('Updated Evidencias');
      updatedEvidencias.info.should.equal('This is the updated evidencias!!!');
    });

  });

  describe('DELETE /api/evidencias/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/evidencias/' + newEvidencias._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when evidencias does not exist', function(done) {
      request(app)
        .delete('/api/evidencias/' + newEvidencias._id)
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
