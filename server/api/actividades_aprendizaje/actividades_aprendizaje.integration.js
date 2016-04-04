'use strict';

var app = require('../..');
import request from 'supertest';

var newActividadesAprendizaje;

describe('ActividadesAprendizaje API:', function() {

  describe('GET /api/actividades_aprendizaje', function() {
    var actividadesAprendizajes;

    beforeEach(function(done) {
      request(app)
        .get('/api/actividades_aprendizaje')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          actividadesAprendizajes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      actividadesAprendizajes.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/actividades_aprendizaje', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/actividades_aprendizaje')
        .send({
          name: 'New ActividadesAprendizaje',
          info: 'This is the brand new actividadesAprendizaje!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newActividadesAprendizaje = res.body;
          done();
        });
    });

    it('should respond with the newly created actividadesAprendizaje', function() {
      newActividadesAprendizaje.name.should.equal('New ActividadesAprendizaje');
      newActividadesAprendizaje.info.should.equal('This is the brand new actividadesAprendizaje!!!');
    });

  });

  describe('GET /api/actividades_aprendizaje/:id', function() {
    var actividadesAprendizaje;

    beforeEach(function(done) {
      request(app)
        .get('/api/actividades_aprendizaje/' + newActividadesAprendizaje._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          actividadesAprendizaje = res.body;
          done();
        });
    });

    afterEach(function() {
      actividadesAprendizaje = {};
    });

    it('should respond with the requested actividadesAprendizaje', function() {
      actividadesAprendizaje.name.should.equal('New ActividadesAprendizaje');
      actividadesAprendizaje.info.should.equal('This is the brand new actividadesAprendizaje!!!');
    });

  });

  describe('PUT /api/actividades_aprendizaje/:id', function() {
    var updatedActividadesAprendizaje;

    beforeEach(function(done) {
      request(app)
        .put('/api/actividades_aprendizaje/' + newActividadesAprendizaje._id)
        .send({
          name: 'Updated ActividadesAprendizaje',
          info: 'This is the updated actividadesAprendizaje!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedActividadesAprendizaje = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedActividadesAprendizaje = {};
    });

    it('should respond with the updated actividadesAprendizaje', function() {
      updatedActividadesAprendizaje.name.should.equal('Updated ActividadesAprendizaje');
      updatedActividadesAprendizaje.info.should.equal('This is the updated actividadesAprendizaje!!!');
    });

  });

  describe('DELETE /api/actividades_aprendizaje/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/actividades_aprendizaje/' + newActividadesAprendizaje._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when actividadesAprendizaje does not exist', function(done) {
      request(app)
        .delete('/api/actividades_aprendizaje/' + newActividadesAprendizaje._id)
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
