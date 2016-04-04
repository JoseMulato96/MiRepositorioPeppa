'use strict';

var app = require('../..');
import request from 'supertest';

var newTiposEvidencias;

describe('TiposEvidencias API:', function() {

  describe('GET /api/tipos_evidencias', function() {
    var tiposEvidenciass;

    beforeEach(function(done) {
      request(app)
        .get('/api/tipos_evidencias')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          tiposEvidenciass = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      tiposEvidenciass.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/tipos_evidencias', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/tipos_evidencias')
        .send({
          name: 'New TiposEvidencias',
          info: 'This is the brand new tiposEvidencias!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newTiposEvidencias = res.body;
          done();
        });
    });

    it('should respond with the newly created tiposEvidencias', function() {
      newTiposEvidencias.name.should.equal('New TiposEvidencias');
      newTiposEvidencias.info.should.equal('This is the brand new tiposEvidencias!!!');
    });

  });

  describe('GET /api/tipos_evidencias/:id', function() {
    var tiposEvidencias;

    beforeEach(function(done) {
      request(app)
        .get('/api/tipos_evidencias/' + newTiposEvidencias._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          tiposEvidencias = res.body;
          done();
        });
    });

    afterEach(function() {
      tiposEvidencias = {};
    });

    it('should respond with the requested tiposEvidencias', function() {
      tiposEvidencias.name.should.equal('New TiposEvidencias');
      tiposEvidencias.info.should.equal('This is the brand new tiposEvidencias!!!');
    });

  });

  describe('PUT /api/tipos_evidencias/:id', function() {
    var updatedTiposEvidencias;

    beforeEach(function(done) {
      request(app)
        .put('/api/tipos_evidencias/' + newTiposEvidencias._id)
        .send({
          name: 'Updated TiposEvidencias',
          info: 'This is the updated tiposEvidencias!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTiposEvidencias = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTiposEvidencias = {};
    });

    it('should respond with the updated tiposEvidencias', function() {
      updatedTiposEvidencias.name.should.equal('Updated TiposEvidencias');
      updatedTiposEvidencias.info.should.equal('This is the updated tiposEvidencias!!!');
    });

  });

  describe('DELETE /api/tipos_evidencias/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/tipos_evidencias/' + newTiposEvidencias._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when tiposEvidencias does not exist', function(done) {
      request(app)
        .delete('/api/tipos_evidencias/' + newTiposEvidencias._id)
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
