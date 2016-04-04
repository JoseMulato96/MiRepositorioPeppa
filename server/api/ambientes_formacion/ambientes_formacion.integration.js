'use strict';

var app = require('../..');
import request from 'supertest';

var newAmbientesFormacion;

describe('AmbientesFormacion API:', function() {

  describe('GET /api/ambientes_formacion', function() {
    var ambientesFormacions;

    beforeEach(function(done) {
      request(app)
        .get('/api/ambientes_formacion')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          ambientesFormacions = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      ambientesFormacions.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/ambientes_formacion', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/ambientes_formacion')
        .send({
          name: 'New AmbientesFormacion',
          info: 'This is the brand new ambientesFormacion!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newAmbientesFormacion = res.body;
          done();
        });
    });

    it('should respond with the newly created ambientesFormacion', function() {
      newAmbientesFormacion.name.should.equal('New AmbientesFormacion');
      newAmbientesFormacion.info.should.equal('This is the brand new ambientesFormacion!!!');
    });

  });

  describe('GET /api/ambientes_formacion/:id', function() {
    var ambientesFormacion;

    beforeEach(function(done) {
      request(app)
        .get('/api/ambientes_formacion/' + newAmbientesFormacion.id_ambiente_formacion)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          ambientesFormacion = res.body;
          done();
        });
    });

    afterEach(function() {
      ambientesFormacion = {};
    });

    it('should respond with the requested ambientesFormacion', function() {
      ambientesFormacion.name.should.equal('New AmbientesFormacion');
      ambientesFormacion.info.should.equal('This is the brand new ambientesFormacion!!!');
    });

  });

  describe('PUT /api/ambientes_formacion/:id', function() {
    var updatedAmbientesFormacion;

    beforeEach(function(done) {
      request(app)
        .put('/api/ambientes_formacion/' + newAmbientesFormacion.id_ambiente_formacion)
        .send({
          name: 'Updated AmbientesFormacion',
          info: 'This is the updated ambientesFormacion!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedAmbientesFormacion = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedAmbientesFormacion = {};
    });

    it('should respond with the updated ambientesFormacion', function() {
      updatedAmbientesFormacion.name.should.equal('Updated AmbientesFormacion');
      updatedAmbientesFormacion.info.should.equal('This is the updated ambientesFormacion!!!');
    });

  });

  describe('DELETE /api/ambientes_formacion/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/ambientes_formacion/' + newAmbientesFormacion.id_ambiente_formacion)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when ambientesFormacion does not exist', function(done) {
      request(app)
        .delete('/api/ambientes_formacion/' + newAmbientesFormacion.id_ambiente_formacion)
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
