'use strict';

var app = require('../..');
import request from 'supertest';

var newRecursos;

describe('Recursos API:', function() {

  describe('GET /api/recursos', function() {
    var recursoss;

    beforeEach(function(done) {
      request(app)
        .get('/api/recursos')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          recursoss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      recursoss.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/recursos', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/recursos')
        .send({
          name: 'New Recursos',
          info: 'This is the brand new recursos!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newRecursos = res.body;
          done();
        });
    });

    it('should respond with the newly created recursos', function() {
      newRecursos.name.should.equal('New Recursos');
      newRecursos.info.should.equal('This is the brand new recursos!!!');
    });

  });

  describe('GET /api/recursos/:id', function() {
    var recursos;

    beforeEach(function(done) {
      request(app)
        .get('/api/recursos/' + newRecursos._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          recursos = res.body;
          done();
        });
    });

    afterEach(function() {
      recursos = {};
    });

    it('should respond with the requested recursos', function() {
      recursos.name.should.equal('New Recursos');
      recursos.info.should.equal('This is the brand new recursos!!!');
    });

  });

  describe('PUT /api/recursos/:id', function() {
    var updatedRecursos;

    beforeEach(function(done) {
      request(app)
        .put('/api/recursos/' + newRecursos._id)
        .send({
          name: 'Updated Recursos',
          info: 'This is the updated recursos!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedRecursos = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedRecursos = {};
    });

    it('should respond with the updated recursos', function() {
      updatedRecursos.name.should.equal('Updated Recursos');
      updatedRecursos.info.should.equal('This is the updated recursos!!!');
    });

  });

  describe('DELETE /api/recursos/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/recursos/' + newRecursos._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when recursos does not exist', function(done) {
      request(app)
        .delete('/api/recursos/' + newRecursos._id)
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
