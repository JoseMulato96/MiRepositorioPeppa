'use strict';

var app = require('../..');
import request from 'supertest';

var newTiposVocero;

describe('TiposVocero API:', function() {

  describe('GET /api/tipos_vocero', function() {
    var tiposVoceros;

    beforeEach(function(done) {
      request(app)
        .get('/api/tipos_vocero')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          tiposVoceros = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      tiposVoceros.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/tipos_vocero', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/tipos_vocero')
        .send({
          name: 'New TiposVocero',
          info: 'This is the brand new tiposVocero!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newTiposVocero = res.body;
          done();
        });
    });

    it('should respond with the newly created tiposVocero', function() {
      newTiposVocero.name.should.equal('New TiposVocero');
      newTiposVocero.info.should.equal('This is the brand new tiposVocero!!!');
    });

  });

  describe('GET /api/tipos_vocero/:id', function() {
    var tiposVocero;

    beforeEach(function(done) {
      request(app)
        .get('/api/tipos_vocero/' + newTiposVocero.id_tipo_vocero)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          tiposVocero = res.body;
          done();
        });
    });

    afterEach(function() {
      tiposVocero = {};
    });

    it('should respond with the requested tiposVocero', function() {
      tiposVocero.name.should.equal('New TiposVocero');
      tiposVocero.info.should.equal('This is the brand new tiposVocero!!!');
    });

  });

  describe('PUT /api/tipos_vocero/:id', function() {
    var updatedTiposVocero;

    beforeEach(function(done) {
      request(app)
        .put('/api/tipos_vocero/' + newTiposVocero.id_tipo_vocero)
        .send({
          name: 'Updated TiposVocero',
          info: 'This is the updated tiposVocero!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTiposVocero = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTiposVocero = {};
    });

    it('should respond with the updated tiposVocero', function() {
      updatedTiposVocero.name.should.equal('Updated TiposVocero');
      updatedTiposVocero.info.should.equal('This is the updated tiposVocero!!!');
    });

  });

  describe('DELETE /api/tipos_vocero/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/tipos_vocero/' + newTiposVocero.id_tipo_vocero)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when tiposVocero does not exist', function(done) {
      request(app)
        .delete('/api/tipos_vocero/' + newTiposVocero.id_tipo_vocero)
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
