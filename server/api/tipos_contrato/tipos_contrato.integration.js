'use strict';

var app = require('../..');
import request from 'supertest';

var newTiposContrato;

describe('TiposContrato API:', function() {

  describe('GET /api/tipos_contrato', function() {
    var tiposContratos;

    beforeEach(function(done) {
      request(app)
        .get('/api/tipos_contrato')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          tiposContratos = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      tiposContratos.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/tipos_contrato', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/tipos_contrato')
        .send({
          name: 'New TiposContrato',
          info: 'This is the brand new tiposContrato!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newTiposContrato = res.body;
          done();
        });
    });

    it('should respond with the newly created tiposContrato', function() {
      newTiposContrato.name.should.equal('New TiposContrato');
      newTiposContrato.info.should.equal('This is the brand new tiposContrato!!!');
    });

  });

  describe('GET /api/tipos_contrato/:id', function() {
    var tiposContrato;

    beforeEach(function(done) {
      request(app)
        .get('/api/tipos_contrato/' + newTiposContrato.id_tipo_contrato)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          tiposContrato = res.body;
          done();
        });
    });

    afterEach(function() {
      tiposContrato = {};
    });

    it('should respond with the requested tiposContrato', function() {
      tiposContrato.name.should.equal('New TiposContrato');
      tiposContrato.info.should.equal('This is the brand new tiposContrato!!!');
    });

  });

  describe('PUT /api/tipos_contrato/:id', function() {
    var updatedTiposContrato;

    beforeEach(function(done) {
      request(app)
        .put('/api/tipos_contrato/' + newTiposContrato.id_tipo_contrato)
        .send({
          name: 'Updated TiposContrato',
          info: 'This is the updated tiposContrato!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTiposContrato = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTiposContrato = {};
    });

    it('should respond with the updated tiposContrato', function() {
      updatedTiposContrato.name.should.equal('Updated TiposContrato');
      updatedTiposContrato.info.should.equal('This is the updated tiposContrato!!!');
    });

  });

  describe('DELETE /api/tipos_contrato/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/tipos_contrato/' + newTiposContrato.id_tipo_contrato)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when tiposContrato does not exist', function(done) {
      request(app)
        .delete('/api/tipos_contrato/' + newTiposContrato.id_tipo_contrato)
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
