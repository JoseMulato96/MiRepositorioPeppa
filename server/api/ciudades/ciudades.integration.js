'use strict';

var app = require('../..');
import request from 'supertest';

var newCiudades;

describe('Ciudades API:', function() {

  describe('GET /api/ciudades', function() {
    var ciudadess;

    beforeEach(function(done) {
      request(app)
        .get('/api/ciudades')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          ciudadess = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      ciudadess.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/ciudades', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/ciudades')
        .send({
          name: 'New Ciudades',
          info: 'This is the brand new ciudades!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newCiudades = res.body;
          done();
        });
    });

    it('should respond with the newly created ciudades', function() {
      newCiudades.name.should.equal('New Ciudades');
      newCiudades.info.should.equal('This is the brand new ciudades!!!');
    });

  });

  describe('GET /api/ciudades/:id', function() {
    var ciudades;

    beforeEach(function(done) {
      request(app)
        .get('/api/ciudades/' + newCiudades.id_ciudad)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          ciudades = res.body;
          done();
        });
    });

    afterEach(function() {
      ciudades = {};
    });

    it('should respond with the requested ciudades', function() {
      ciudades.name.should.equal('New Ciudades');
      ciudades.info.should.equal('This is the brand new ciudades!!!');
    });

  });

  describe('PUT /api/ciudades/:id', function() {
    var updatedCiudades;

    beforeEach(function(done) {
      request(app)
        .put('/api/ciudades/' + newCiudades.id_ciudad)
        .send({
          name: 'Updated Ciudades',
          info: 'This is the updated ciudades!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCiudades = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCiudades = {};
    });

    it('should respond with the updated ciudades', function() {
      updatedCiudades.name.should.equal('Updated Ciudades');
      updatedCiudades.info.should.equal('This is the updated ciudades!!!');
    });

  });

  describe('DELETE /api/ciudades/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/ciudades/' + newCiudades.id_ciudad)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when ciudades does not exist', function(done) {
      request(app)
        .delete('/api/ciudades/' + newCiudades.id_ciudad)
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
