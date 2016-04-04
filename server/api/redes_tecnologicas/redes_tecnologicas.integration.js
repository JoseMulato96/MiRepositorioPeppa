'use strict';

var app = require('../..');
import request from 'supertest';

var newRedesTecnologicas;

describe('RedesTecnologicas API:', function() {

  describe('GET /api/redes_tecnologicas', function() {
    var redesTecnologicass;

    beforeEach(function(done) {
      request(app)
        .get('/api/redes_tecnologicas')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          redesTecnologicass = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      redesTecnologicass.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/redes_tecnologicas', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/redes_tecnologicas')
        .send({
          name: 'New RedesTecnologicas',
          info: 'This is the brand new redesTecnologicas!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newRedesTecnologicas = res.body;
          done();
        });
    });

    it('should respond with the newly created redesTecnologicas', function() {
      newRedesTecnologicas.name.should.equal('New RedesTecnologicas');
      newRedesTecnologicas.info.should.equal('This is the brand new redesTecnologicas!!!');
    });

  });

  describe('GET /api/redes_tecnologicas/:id', function() {
    var redesTecnologicas;

    beforeEach(function(done) {
      request(app)
        .get('/api/redes_tecnologicas/' + newRedesTecnologicas._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          redesTecnologicas = res.body;
          done();
        });
    });

    afterEach(function() {
      redesTecnologicas = {};
    });

    it('should respond with the requested redesTecnologicas', function() {
      redesTecnologicas.name.should.equal('New RedesTecnologicas');
      redesTecnologicas.info.should.equal('This is the brand new redesTecnologicas!!!');
    });

  });

  describe('PUT /api/redes_tecnologicas/:id', function() {
    var updatedRedesTecnologicas;

    beforeEach(function(done) {
      request(app)
        .put('/api/redes_tecnologicas/' + newRedesTecnologicas._id)
        .send({
          name: 'Updated RedesTecnologicas',
          info: 'This is the updated redesTecnologicas!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedRedesTecnologicas = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedRedesTecnologicas = {};
    });

    it('should respond with the updated redesTecnologicas', function() {
      updatedRedesTecnologicas.name.should.equal('Updated RedesTecnologicas');
      updatedRedesTecnologicas.info.should.equal('This is the updated redesTecnologicas!!!');
    });

  });

  describe('DELETE /api/redes_tecnologicas/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/redes_tecnologicas/' + newRedesTecnologicas._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when redesTecnologicas does not exist', function(done) {
      request(app)
        .delete('/api/redes_tecnologicas/' + newRedesTecnologicas._id)
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
