'use strict';

var app = require('../..');
import request from 'supertest';

var newNovedadesInstructor;

describe('NovedadesInstructor API:', function() {

  describe('GET /api/novedades_instructor', function() {
    var novedadesInstructors;

    beforeEach(function(done) {
      request(app)
        .get('/api/novedades_instructor')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          novedadesInstructors = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      novedadesInstructors.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/novedades_instructor', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/novedades_instructor')
        .send({
          name: 'New NovedadesInstructor',
          info: 'This is the brand new novedadesInstructor!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newNovedadesInstructor = res.body;
          done();
        });
    });

    it('should respond with the newly created novedadesInstructor', function() {
      newNovedadesInstructor.name.should.equal('New NovedadesInstructor');
      newNovedadesInstructor.info.should.equal('This is the brand new novedadesInstructor!!!');
    });

  });

  describe('GET /api/novedades_instructor/:id', function() {
    var novedadesInstructor;

    beforeEach(function(done) {
      request(app)
        .get('/api/novedades_instructor/' + newNovedadesInstructor.id_novedad_instructor)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          novedadesInstructor = res.body;
          done();
        });
    });

    afterEach(function() {
      novedadesInstructor = {};
    });

    it('should respond with the requested novedadesInstructor', function() {
      novedadesInstructor.name.should.equal('New NovedadesInstructor');
      novedadesInstructor.info.should.equal('This is the brand new novedadesInstructor!!!');
    });

  });

  describe('PUT /api/novedades_instructor/:id', function() {
    var updatedNovedadesInstructor;

    beforeEach(function(done) {
      request(app)
        .put('/api/novedades_instructor/' + newNovedadesInstructor.id_novedad_instructor)
        .send({
          name: 'Updated NovedadesInstructor',
          info: 'This is the updated novedadesInstructor!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedNovedadesInstructor = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedNovedadesInstructor = {};
    });

    it('should respond with the updated novedadesInstructor', function() {
      updatedNovedadesInstructor.name.should.equal('Updated NovedadesInstructor');
      updatedNovedadesInstructor.info.should.equal('This is the updated novedadesInstructor!!!');
    });

  });

  describe('DELETE /api/novedades_instructor/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/novedades_instructor/' + newNovedadesInstructor.id_novedad_instructor)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when novedadesInstructor does not exist', function(done) {
      request(app)
        .delete('/api/novedades_instructor/' + newNovedadesInstructor.id_novedad_instructor)
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
