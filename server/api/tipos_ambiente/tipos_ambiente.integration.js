'use strict';

var app = require('../..');
import request from 'supertest';

var newTiposAmbiente;

describe('TiposAmbiente API:', function() {

  describe('GET /api/tipos_ambiente', function() {
    var tiposAmbientes;

    beforeEach(function(done) {
      request(app)
        .get('/api/tipos_ambiente')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          tiposAmbientes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      tiposAmbientes.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/tipos_ambiente', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/tipos_ambiente')
        .send({
          name: 'New TiposAmbiente',
          info: 'This is the brand new tiposAmbiente!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newTiposAmbiente = res.body;
          done();
        });
    });

    it('should respond with the newly created tiposAmbiente', function() {
      newTiposAmbiente.name.should.equal('New TiposAmbiente');
      newTiposAmbiente.info.should.equal('This is the brand new tiposAmbiente!!!');
    });

  });

  describe('GET /api/tipos_ambiente/:id', function() {
    var tiposAmbiente;

    beforeEach(function(done) {
      request(app)
        .get('/api/tipos_ambiente/' + newTiposAmbiente.id_tipo_ambiente)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          tiposAmbiente = res.body;
          done();
        });
    });

    afterEach(function() {
      tiposAmbiente = {};
    });

    it('should respond with the requested tiposAmbiente', function() {
      tiposAmbiente.name.should.equal('New TiposAmbiente');
      tiposAmbiente.info.should.equal('This is the brand new tiposAmbiente!!!');
    });

  });

  describe('PUT /api/tipos_ambiente/:id', function() {
    var updatedTiposAmbiente;

    beforeEach(function(done) {
      request(app)
        .put('/api/tipos_ambiente/' + newTiposAmbiente.id_tipo_ambiente)
        .send({
          name: 'Updated TiposAmbiente',
          info: 'This is the updated tiposAmbiente!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTiposAmbiente = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTiposAmbiente = {};
    });

    it('should respond with the updated tiposAmbiente', function() {
      updatedTiposAmbiente.name.should.equal('Updated TiposAmbiente');
      updatedTiposAmbiente.info.should.equal('This is the updated tiposAmbiente!!!');
    });

  });

  describe('DELETE /api/tipos_ambiente/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/tipos_ambiente/' + newTiposAmbiente.id_tipo_ambiente)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when tiposAmbiente does not exist', function(done) {
      request(app)
        .delete('/api/tipos_ambiente/' + newTiposAmbiente.id_tipo_ambiente)
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
