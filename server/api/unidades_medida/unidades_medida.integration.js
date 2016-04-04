'use strict';

var app = require('../..');
import request from 'supertest';

var newUnidadesMedida;

describe('UnidadesMedida API:', function() {

  describe('GET /api/unidades_medida', function() {
    var unidadesMedidas;

    beforeEach(function(done) {
      request(app)
        .get('/api/unidades_medida')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          unidadesMedidas = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      unidadesMedidas.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/unidades_medida', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/unidades_medida')
        .send({
          name: 'New UnidadesMedida',
          info: 'This is the brand new unidadesMedida!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newUnidadesMedida = res.body;
          done();
        });
    });

    it('should respond with the newly created unidadesMedida', function() {
      newUnidadesMedida.name.should.equal('New UnidadesMedida');
      newUnidadesMedida.info.should.equal('This is the brand new unidadesMedida!!!');
    });

  });

  describe('GET /api/unidades_medida/:id', function() {
    var unidadesMedida;

    beforeEach(function(done) {
      request(app)
        .get('/api/unidades_medida/' + newUnidadesMedida._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          unidadesMedida = res.body;
          done();
        });
    });

    afterEach(function() {
      unidadesMedida = {};
    });

    it('should respond with the requested unidadesMedida', function() {
      unidadesMedida.name.should.equal('New UnidadesMedida');
      unidadesMedida.info.should.equal('This is the brand new unidadesMedida!!!');
    });

  });

  describe('PUT /api/unidades_medida/:id', function() {
    var updatedUnidadesMedida;

    beforeEach(function(done) {
      request(app)
        .put('/api/unidades_medida/' + newUnidadesMedida._id)
        .send({
          name: 'Updated UnidadesMedida',
          info: 'This is the updated unidadesMedida!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedUnidadesMedida = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedUnidadesMedida = {};
    });

    it('should respond with the updated unidadesMedida', function() {
      updatedUnidadesMedida.name.should.equal('Updated UnidadesMedida');
      updatedUnidadesMedida.info.should.equal('This is the updated unidadesMedida!!!');
    });

  });

  describe('DELETE /api/unidades_medida/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/unidades_medida/' + newUnidadesMedida._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when unidadesMedida does not exist', function(done) {
      request(app)
        .delete('/api/unidades_medida/' + newUnidadesMedida._id)
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
