'use strict';

var app = require('../..');
import request from 'supertest';

var newTiposOferta;

describe('TiposOferta API:', function() {

  describe('GET /api/tipos_oferta', function() {
    var tiposOfertas;

    beforeEach(function(done) {
      request(app)
        .get('/api/tipos_oferta')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          tiposOfertas = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      tiposOfertas.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/tipos_oferta', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/tipos_oferta')
        .send({
          name: 'New TiposOferta',
          info: 'This is the brand new tiposOferta!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newTiposOferta = res.body;
          done();
        });
    });

    it('should respond with the newly created tiposOferta', function() {
      newTiposOferta.name.should.equal('New TiposOferta');
      newTiposOferta.info.should.equal('This is the brand new tiposOferta!!!');
    });

  });

  describe('GET /api/tipos_oferta/:id', function() {
    var tiposOferta;

    beforeEach(function(done) {
      request(app)
        .get('/api/tipos_oferta/' + newTiposOferta.id_tipo_oferta)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          tiposOferta = res.body;
          done();
        });
    });

    afterEach(function() {
      tiposOferta = {};
    });

    it('should respond with the requested tiposOferta', function() {
      tiposOferta.name.should.equal('New TiposOferta');
      tiposOferta.info.should.equal('This is the brand new tiposOferta!!!');
    });

  });

  describe('PUT /api/tipos_oferta/:id', function() {
    var updatedTiposOferta;

    beforeEach(function(done) {
      request(app)
        .put('/api/tipos_oferta/' + newTiposOferta.id_tipo_oferta)
        .send({
          name: 'Updated TiposOferta',
          info: 'This is the updated tiposOferta!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTiposOferta = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTiposOferta = {};
    });

    it('should respond with the updated tiposOferta', function() {
      updatedTiposOferta.name.should.equal('Updated TiposOferta');
      updatedTiposOferta.info.should.equal('This is the updated tiposOferta!!!');
    });

  });

  describe('DELETE /api/tipos_oferta/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/tipos_oferta/' + newTiposOferta.id_tipo_oferta)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when tiposOferta does not exist', function(done) {
      request(app)
        .delete('/api/tipos_oferta/' + newTiposOferta.id_tipo_oferta)
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
