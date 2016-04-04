'use strict';

var app = require('../..');
import request from 'supertest';

var newEspecialidades;

describe('Especialidades API:', function() {

  describe('GET /api/especialidades', function() {
    var especialidadess;

    beforeEach(function(done) {
      request(app)
        .get('/api/especialidades')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          especialidadess = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      especialidadess.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/especialidades', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/especialidades')
        .send({
          name: 'New Especialidades',
          info: 'This is the brand new especialidades!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newEspecialidades = res.body;
          done();
        });
    });

    it('should respond with the newly created especialidades', function() {
      newEspecialidades.name.should.equal('New Especialidades');
      newEspecialidades.info.should.equal('This is the brand new especialidades!!!');
    });

  });

  describe('GET /api/especialidades/:id', function() {
    var especialidades;

    beforeEach(function(done) {
      request(app)
        .get('/api/especialidades/' + newEspecialidades.id_especialidad)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          especialidades = res.body;
          done();
        });
    });

    afterEach(function() {
      especialidades = {};
    });

    it('should respond with the requested especialidades', function() {
      especialidades.name.should.equal('New Especialidades');
      especialidades.info.should.equal('This is the brand new especialidades!!!');
    });

  });

  describe('PUT /api/especialidades/:id', function() {
    var updatedEspecialidades;

    beforeEach(function(done) {
      request(app)
        .put('/api/especialidades/' + newEspecialidades.id_especialidad)
        .send({
          name: 'Updated Especialidades',
          info: 'This is the updated especialidades!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedEspecialidades = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedEspecialidades = {};
    });

    it('should respond with the updated especialidades', function() {
      updatedEspecialidades.name.should.equal('Updated Especialidades');
      updatedEspecialidades.info.should.equal('This is the updated especialidades!!!');
    });

  });

  describe('DELETE /api/especialidades/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/especialidades/' + newEspecialidades.id_especialidad)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when especialidades does not exist', function(done) {
      request(app)
        .delete('/api/especialidades/' + newEspecialidades.id_especialidad)
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
