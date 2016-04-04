'use strict';

var app = require('../..');
import request from 'supertest';

var newCaracterizaciones;

describe('Caracterizaciones API:', function() {

  describe('GET /api/caracterizaciones', function() {
    var caracterizacioness;

    beforeEach(function(done) {
      request(app)
        .get('/api/caracterizaciones')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          caracterizacioness = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      caracterizacioness.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/caracterizaciones', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/caracterizaciones')
        .send({
          name: 'New Caracterizaciones',
          info: 'This is the brand new caracterizaciones!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newCaracterizaciones = res.body;
          done();
        });
    });

    it('should respond with the newly created caracterizaciones', function() {
      newCaracterizaciones.name.should.equal('New Caracterizaciones');
      newCaracterizaciones.info.should.equal('This is the brand new caracterizaciones!!!');
    });

  });

  describe('GET /api/caracterizaciones/:id', function() {
    var caracterizaciones;

    beforeEach(function(done) {
      request(app)
        .get('/api/caracterizaciones/' + newCaracterizaciones.id_caracterizacion)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          caracterizaciones = res.body;
          done();
        });
    });

    afterEach(function() {
      caracterizaciones = {};
    });

    it('should respond with the requested caracterizaciones', function() {
      caracterizaciones.name.should.equal('New Caracterizaciones');
      caracterizaciones.info.should.equal('This is the brand new caracterizaciones!!!');
    });

  });

  describe('PUT /api/caracterizaciones/:id', function() {
    var updatedCaracterizaciones;

    beforeEach(function(done) {
      request(app)
        .put('/api/caracterizaciones/' + newCaracterizaciones.id_caracterizacion)
        .send({
          name: 'Updated Caracterizaciones',
          info: 'This is the updated caracterizaciones!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCaracterizaciones = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCaracterizaciones = {};
    });

    it('should respond with the updated caracterizaciones', function() {
      updatedCaracterizaciones.name.should.equal('Updated Caracterizaciones');
      updatedCaracterizaciones.info.should.equal('This is the updated caracterizaciones!!!');
    });

  });

  describe('DELETE /api/caracterizaciones/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/caracterizaciones/' + newCaracterizaciones.id_caracterizacion)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when caracterizaciones does not exist', function(done) {
      request(app)
        .delete('/api/caracterizaciones/' + newCaracterizaciones.id_caracterizacion)
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
