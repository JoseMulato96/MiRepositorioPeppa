'use strict';

var app = require('../..');
import request from 'supertest';

var newTiposInstructor;

describe('TiposInstructor API:', function() {

  describe('GET /api/tipos_instuctor', function() {
    var tiposInstructors;

    beforeEach(function(done) {
      request(app)
        .get('/api/tipos_instuctor')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          tiposInstructors = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      tiposInstructors.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/tipos_instuctor', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/tipos_instuctor')
        .send({
          name: 'New TiposInstructor',
          info: 'This is the brand new tiposInstructor!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newTiposInstructor = res.body;
          done();
        });
    });

    it('should respond with the newly created tiposInstructor', function() {
      newTiposInstructor.name.should.equal('New TiposInstructor');
      newTiposInstructor.info.should.equal('This is the brand new tiposInstructor!!!');
    });

  });

  describe('GET /api/tipos_instuctor/:id', function() {
    var tiposInstructor;

    beforeEach(function(done) {
      request(app)
        .get('/api/tipos_instuctor/' + newTiposInstructor.id_tipo_instructor)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          tiposInstructor = res.body;
          done();
        });
    });

    afterEach(function() {
      tiposInstructor = {};
    });

    it('should respond with the requested tiposInstructor', function() {
      tiposInstructor.name.should.equal('New TiposInstructor');
      tiposInstructor.info.should.equal('This is the brand new tiposInstructor!!!');
    });

  });

  describe('PUT /api/tipos_instuctor/:id', function() {
    var updatedTiposInstructor;

    beforeEach(function(done) {
      request(app)
        .put('/api/tipos_instuctor/' + newTiposInstructor.id_tipo_instructor)
        .send({
          name: 'Updated TiposInstructor',
          info: 'This is the updated tiposInstructor!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTiposInstructor = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTiposInstructor = {};
    });

    it('should respond with the updated tiposInstructor', function() {
      updatedTiposInstructor.name.should.equal('Updated TiposInstructor');
      updatedTiposInstructor.info.should.equal('This is the updated tiposInstructor!!!');
    });

  });

  describe('DELETE /api/tipos_instuctor/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/tipos_instuctor/' + newTiposInstructor.id_tipo_instructor)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when tiposInstructor does not exist', function(done) {
      request(app)
        .delete('/api/tipos_instuctor/' + newTiposInstructor.id_tipo_instructor)
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
