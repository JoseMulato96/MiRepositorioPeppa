'use strict';

var app = require('../..');
import request from 'supertest';

var newDepartamentos;

describe('Departamentos API:', function() {

  describe('GET /api/departamentos', function() {
    var departamentoss;

    beforeEach(function(done) {
      request(app)
        .get('/api/departamentos')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          departamentoss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      departamentoss.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/departamentos', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/departamentos')
        .send({
          name: 'New Departamentos',
          info: 'This is the brand new departamentos!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newDepartamentos = res.body;
          done();
        });
    });

    it('should respond with the newly created departamentos', function() {
      newDepartamentos.name.should.equal('New Departamentos');
      newDepartamentos.info.should.equal('This is the brand new departamentos!!!');
    });

  });

  describe('GET /api/departamentos/:id', function() {
    var departamentos;

    beforeEach(function(done) {
      request(app)
        .get('/api/departamentos/' + newDepartamentos.id_departamento)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          departamentos = res.body;
          done();
        });
    });

    afterEach(function() {
      departamentos = {};
    });

    it('should respond with the requested departamentos', function() {
      departamentos.name.should.equal('New Departamentos');
      departamentos.info.should.equal('This is the brand new departamentos!!!');
    });

  });

  describe('PUT /api/departamentos/:id', function() {
    var updatedDepartamentos;

    beforeEach(function(done) {
      request(app)
        .put('/api/departamentos/' + newDepartamentos.id_departamento)
        .send({
          name: 'Updated Departamentos',
          info: 'This is the updated departamentos!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedDepartamentos = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedDepartamentos = {};
    });

    it('should respond with the updated departamentos', function() {
      updatedDepartamentos.name.should.equal('Updated Departamentos');
      updatedDepartamentos.info.should.equal('This is the updated departamentos!!!');
    });

  });

  describe('DELETE /api/departamentos/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/departamentos/' + newDepartamentos.id_departamento)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when departamentos does not exist', function(done) {
      request(app)
        .delete('/api/departamentos/' + newDepartamentos.id_departamento)
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
