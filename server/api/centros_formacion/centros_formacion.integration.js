'use strict';

var app = require('../..');
import request from 'supertest';

var newCentrosFormacion;

describe('CentrosFormacion API:', function() {

  describe('GET /api/centros_formacion', function() {
    var centrosFormacions;

    beforeEach(function(done) {
      request(app)
        .get('/api/centros_formacion')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          centrosFormacions = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      centrosFormacions.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/centros_formacion', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/centros_formacion')
        .send({
          name: 'New CentrosFormacion',
          info: 'This is the brand new centrosFormacion!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newCentrosFormacion = res.body;
          done();
        });
    });

    it('should respond with the newly created centrosFormacion', function() {
      newCentrosFormacion.name.should.equal('New CentrosFormacion');
      newCentrosFormacion.info.should.equal('This is the brand new centrosFormacion!!!');
    });

  });

  describe('GET /api/centros_formacion/:id', function() {
    var centrosFormacion;

    beforeEach(function(done) {
      request(app)
        .get('/api/centros_formacion/' + newCentrosFormacion.id_centro_formacion)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          centrosFormacion = res.body;
          done();
        });
    });

    afterEach(function() {
      centrosFormacion = {};
    });

    it('should respond with the requested centrosFormacion', function() {
      centrosFormacion.name.should.equal('New CentrosFormacion');
      centrosFormacion.info.should.equal('This is the brand new centrosFormacion!!!');
    });

  });

  describe('PUT /api/centros_formacion/:id', function() {
    var updatedCentrosFormacion;

    beforeEach(function(done) {
      request(app)
        .put('/api/centros_formacion/' + newCentrosFormacion.id_centro_formacion)
        .send({
          name: 'Updated CentrosFormacion',
          info: 'This is the updated centrosFormacion!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCentrosFormacion = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCentrosFormacion = {};
    });

    it('should respond with the updated centrosFormacion', function() {
      updatedCentrosFormacion.name.should.equal('Updated CentrosFormacion');
      updatedCentrosFormacion.info.should.equal('This is the updated centrosFormacion!!!');
    });

  });

  describe('DELETE /api/centros_formacion/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/centros_formacion/' + newCentrosFormacion.id_centro_formacion)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when centrosFormacion does not exist', function(done) {
      request(app)
        .delete('/api/centros_formacion/' + newCentrosFormacion.id_centro_formacion)
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
