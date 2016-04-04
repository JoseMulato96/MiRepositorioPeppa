'use strict';

var app = require('../..');
import request from 'supertest';

var newNivelesFormacion;

describe('NivelesFormacion API:', function() {

  describe('GET /api/niveles_formacion', function() {
    var nivelesFormacions;

    beforeEach(function(done) {
      request(app)
        .get('/api/niveles_formacion')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          nivelesFormacions = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      nivelesFormacions.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/niveles_formacion', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/niveles_formacion')
        .send({
          name: 'New NivelesFormacion',
          info: 'This is the brand new nivelesFormacion!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newNivelesFormacion = res.body;
          done();
        });
    });

    it('should respond with the newly created nivelesFormacion', function() {
      newNivelesFormacion.name.should.equal('New NivelesFormacion');
      newNivelesFormacion.info.should.equal('This is the brand new nivelesFormacion!!!');
    });

  });

  describe('GET /api/niveles_formacion/:id', function() {
    var nivelesFormacion;

    beforeEach(function(done) {
      request(app)
        .get('/api/niveles_formacion/' + newNivelesFormacion._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          nivelesFormacion = res.body;
          done();
        });
    });

    afterEach(function() {
      nivelesFormacion = {};
    });

    it('should respond with the requested nivelesFormacion', function() {
      nivelesFormacion.name.should.equal('New NivelesFormacion');
      nivelesFormacion.info.should.equal('This is the brand new nivelesFormacion!!!');
    });

  });

  describe('PUT /api/niveles_formacion/:id', function() {
    var updatedNivelesFormacion;

    beforeEach(function(done) {
      request(app)
        .put('/api/niveles_formacion/' + newNivelesFormacion._id)
        .send({
          name: 'Updated NivelesFormacion',
          info: 'This is the updated nivelesFormacion!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedNivelesFormacion = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedNivelesFormacion = {};
    });

    it('should respond with the updated nivelesFormacion', function() {
      updatedNivelesFormacion.name.should.equal('Updated NivelesFormacion');
      updatedNivelesFormacion.info.should.equal('This is the updated nivelesFormacion!!!');
    });

  });

  describe('DELETE /api/niveles_formacion/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/niveles_formacion/' + newNivelesFormacion._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when nivelesFormacion does not exist', function(done) {
      request(app)
        .delete('/api/niveles_formacion/' + newNivelesFormacion._id)
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
