'use strict';

var app = require('../..');
import request from 'supertest';

var newTiposDocumento;

describe('TiposDocumento API:', function() {

  describe('GET /api/tipos_documento', function() {
    var tiposDocumentos;

    beforeEach(function(done) {
      request(app)
        .get('/api/tipos_documento')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          tiposDocumentos = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      tiposDocumentos.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/tipos_documento', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/tipos_documento')
        .send({
          name: 'New TiposDocumento',
          info: 'This is the brand new tiposDocumento!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newTiposDocumento = res.body;
          done();
        });
    });

    it('should respond with the newly created tiposDocumento', function() {
      newTiposDocumento.name.should.equal('New TiposDocumento');
      newTiposDocumento.info.should.equal('This is the brand new tiposDocumento!!!');
    });

  });

  describe('GET /api/tipos_documento/:id', function() {
    var tiposDocumento;

    beforeEach(function(done) {
      request(app)
        .get('/api/tipos_documento/' + newTiposDocumento.id_tipo_documento)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          tiposDocumento = res.body;
          done();
        });
    });

    afterEach(function() {
      tiposDocumento = {};
    });

    it('should respond with the requested tiposDocumento', function() {
      tiposDocumento.name.should.equal('New TiposDocumento');
      tiposDocumento.info.should.equal('This is the brand new tiposDocumento!!!');
    });

  });

  describe('PUT /api/tipos_documento/:id', function() {
    var updatedTiposDocumento;

    beforeEach(function(done) {
      request(app)
        .put('/api/tipos_documento/' + newTiposDocumento.id_tipo_documento)
        .send({
          name: 'Updated TiposDocumento',
          info: 'This is the updated tiposDocumento!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTiposDocumento = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTiposDocumento = {};
    });

    it('should respond with the updated tiposDocumento', function() {
      updatedTiposDocumento.name.should.equal('Updated TiposDocumento');
      updatedTiposDocumento.info.should.equal('This is the updated tiposDocumento!!!');
    });

  });

  describe('DELETE /api/tipos_documento/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/tipos_documento/' + newTiposDocumento.id_tipo_documento)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when tiposDocumento does not exist', function(done) {
      request(app)
        .delete('/api/tipos_documento/' + newTiposDocumento.id_tipo_documento)
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
