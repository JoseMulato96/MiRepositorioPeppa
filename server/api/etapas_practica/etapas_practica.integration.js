'use strict';

var app = require('../..');
import request from 'supertest';

var newEtapasPractica;

describe('EtapasPractica API:', function() {

  describe('GET /api/etapas_practica', function() {
    var etapasPracticas;

    beforeEach(function(done) {
      request(app)
        .get('/api/etapas_practica')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          etapasPracticas = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      etapasPracticas.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/etapas_practica', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/etapas_practica')
        .send({
          name: 'New EtapasPractica',
          info: 'This is the brand new etapasPractica!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newEtapasPractica = res.body;
          done();
        });
    });

    it('should respond with the newly created etapasPractica', function() {
      newEtapasPractica.name.should.equal('New EtapasPractica');
      newEtapasPractica.info.should.equal('This is the brand new etapasPractica!!!');
    });

  });

  describe('GET /api/etapas_practica/:id', function() {
    var etapasPractica;

    beforeEach(function(done) {
      request(app)
        .get('/api/etapas_practica/' + newEtapasPractica.id_etapa_practica)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          etapasPractica = res.body;
          done();
        });
    });

    afterEach(function() {
      etapasPractica = {};
    });

    it('should respond with the requested etapasPractica', function() {
      etapasPractica.name.should.equal('New EtapasPractica');
      etapasPractica.info.should.equal('This is the brand new etapasPractica!!!');
    });

  });

  describe('PUT /api/etapas_practica/:id', function() {
    var updatedEtapasPractica;

    beforeEach(function(done) {
      request(app)
        .put('/api/etapas_practica/' + newEtapasPractica.id_etapa_practica)
        .send({
          name: 'Updated EtapasPractica',
          info: 'This is the updated etapasPractica!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedEtapasPractica = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedEtapasPractica = {};
    });

    it('should respond with the updated etapasPractica', function() {
      updatedEtapasPractica.name.should.equal('Updated EtapasPractica');
      updatedEtapasPractica.info.should.equal('This is the updated etapasPractica!!!');
    });

  });

  describe('DELETE /api/etapas_practica/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/etapas_practica/' + newEtapasPractica.id_etapa_practica)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when etapasPractica does not exist', function(done) {
      request(app)
        .delete('/api/etapas_practica/' + newEtapasPractica.id_etapa_practica)
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
