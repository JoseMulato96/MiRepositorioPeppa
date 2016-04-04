'use strict';

var app = require('../..');
import request from 'supertest';

var newLineasTecnologicas;

describe('LineasTecnologicas API:', function() {

  describe('GET /api/lineas_tecnologicas', function() {
    var lineasTecnologicass;

    beforeEach(function(done) {
      request(app)
        .get('/api/lineas_tecnologicas')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          lineasTecnologicass = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      lineasTecnologicass.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/lineas_tecnologicas', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/lineas_tecnologicas')
        .send({
          name: 'New LineasTecnologicas',
          info: 'This is the brand new lineasTecnologicas!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newLineasTecnologicas = res.body;
          done();
        });
    });

    it('should respond with the newly created lineasTecnologicas', function() {
      newLineasTecnologicas.name.should.equal('New LineasTecnologicas');
      newLineasTecnologicas.info.should.equal('This is the brand new lineasTecnologicas!!!');
    });

  });

  describe('GET /api/lineas_tecnologicas/:id', function() {
    var lineasTecnologicas;

    beforeEach(function(done) {
      request(app)
        .get('/api/lineas_tecnologicas/' + newLineasTecnologicas._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          lineasTecnologicas = res.body;
          done();
        });
    });

    afterEach(function() {
      lineasTecnologicas = {};
    });

    it('should respond with the requested lineasTecnologicas', function() {
      lineasTecnologicas.name.should.equal('New LineasTecnologicas');
      lineasTecnologicas.info.should.equal('This is the brand new lineasTecnologicas!!!');
    });

  });

  describe('PUT /api/lineas_tecnologicas/:id', function() {
    var updatedLineasTecnologicas;

    beforeEach(function(done) {
      request(app)
        .put('/api/lineas_tecnologicas/' + newLineasTecnologicas._id)
        .send({
          name: 'Updated LineasTecnologicas',
          info: 'This is the updated lineasTecnologicas!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedLineasTecnologicas = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedLineasTecnologicas = {};
    });

    it('should respond with the updated lineasTecnologicas', function() {
      updatedLineasTecnologicas.name.should.equal('Updated LineasTecnologicas');
      updatedLineasTecnologicas.info.should.equal('This is the updated lineasTecnologicas!!!');
    });

  });

  describe('DELETE /api/lineas_tecnologicas/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/lineas_tecnologicas/' + newLineasTecnologicas._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when lineasTecnologicas does not exist', function(done) {
      request(app)
        .delete('/api/lineas_tecnologicas/' + newLineasTecnologicas._id)
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
