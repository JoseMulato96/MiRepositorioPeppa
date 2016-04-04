'use strict';

var app = require('../..');
import request from 'supertest';

var newModalidadesFormacion;

describe('ModalidadesFormacion API:', function() {

  describe('GET /api/modalidades_formacion', function() {
    var modalidadesFormacions;

    beforeEach(function(done) {
      request(app)
        .get('/api/modalidades_formacion')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          modalidadesFormacions = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      modalidadesFormacions.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/modalidades_formacion', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/modalidades_formacion')
        .send({
          name: 'New ModalidadesFormacion',
          info: 'This is the brand new modalidadesFormacion!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newModalidadesFormacion = res.body;
          done();
        });
    });

    it('should respond with the newly created modalidadesFormacion', function() {
      newmodalidadesFormacion.name.should.equal('New modalidadesFormacion');
      newmodalidadesFormacion.info.should.equal('This is the brand new modalidadesFormacion!!!');
    });

  });

  describe('GET /api/modalidad_formacion/:id', function() {
    var modalidadesFormacion;

    beforeEach(function(done) {
      request(app)
        .get('/api/modalidad_formacion/' + newmodalidadesFormacion._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          modalidadesFormacion = res.body;
          done();
        });
    });

    afterEach(function() {
      modalidadesFormacion = {};
    });

    it('should respond with the requested modalidadesFormacion', function() {
      modalidadesFormacion.name.should.equal('New modalidadesFormacion');
      modalidadesFormacion.info.should.equal('This is the brand new modalidadesFormacion!!!');
    });

  });

  describe('PUT /api/modalidad_formacion/:id', function() {
    var updatedmodalidadesFormacion;

    beforeEach(function(done) {
      request(app)
        .put('/api/modalidad_formacion/' + newmodalidadesFormacion._id)
        .send({
          name: 'Updated modalidadesFormacion',
          info: 'This is the updated modalidadesFormacion!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedmodalidadesFormacion = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedmodalidadesFormacion = {};
    });

    it('should respond with the updated modalidadesFormacion', function() {
      updatedmodalidadesFormacion.name.should.equal('Updated modalidadesFormacion');
      updatedmodalidadesFormacion.info.should.equal('This is the updated modalidadesFormacion!!!');
    });

  });

  describe('DELETE /api/modalidad_formacion/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/modalidad_formacion/' + newmodalidadesFormacion._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when modalidadesFormacion does not exist', function(done) {
      request(app)
        .delete('/api/modalidad_formacion/' + newmodalidadesFormacion._id)
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
