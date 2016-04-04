'use strict';

var app = require('../..');
import request from 'supertest';

var newTipoActividadesAprendizaje;

describe('TipoActividadesAprendizaje API:', function() {

  describe('GET /api/tipo_actividades_aprendizaje', function() {
    var tipoActividadesAprendizajes;

    beforeEach(function(done) {
      request(app)
        .get('/api/tipo_actividades_aprendizaje')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          tipoActividadesAprendizajes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      tipoActividadesAprendizajes.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/tipo_actividades_aprendizaje', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/tipo_actividades_aprendizaje')
        .send({
          name: 'New TipoActividadesAprendizaje',
          info: 'This is the brand new tipoActividadesAprendizaje!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newTipoActividadesAprendizaje = res.body;
          done();
        });
    });

    it('should respond with the newly created tipoActividadesAprendizaje', function() {
      newTipoActividadesAprendizaje.name.should.equal('New TipoActividadesAprendizaje');
      newTipoActividadesAprendizaje.info.should.equal('This is the brand new tipoActividadesAprendizaje!!!');
    });

  });

  describe('GET /api/tipo_actividades_aprendizaje/:id', function() {
    var tipoActividadesAprendizaje;

    beforeEach(function(done) {
      request(app)
        .get('/api/tipo_actividades_aprendizaje/' + newTipoActividadesAprendizaje._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          tipoActividadesAprendizaje = res.body;
          done();
        });
    });

    afterEach(function() {
      tipoActividadesAprendizaje = {};
    });

    it('should respond with the requested tipoActividadesAprendizaje', function() {
      tipoActividadesAprendizaje.name.should.equal('New TipoActividadesAprendizaje');
      tipoActividadesAprendizaje.info.should.equal('This is the brand new tipoActividadesAprendizaje!!!');
    });

  });

  describe('PUT /api/tipo_actividades_aprendizaje/:id', function() {
    var updatedTipoActividadesAprendizaje;

    beforeEach(function(done) {
      request(app)
        .put('/api/tipo_actividades_aprendizaje/' + newTipoActividadesAprendizaje._id)
        .send({
          name: 'Updated TipoActividadesAprendizaje',
          info: 'This is the updated tipoActividadesAprendizaje!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTipoActividadesAprendizaje = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTipoActividadesAprendizaje = {};
    });

    it('should respond with the updated tipoActividadesAprendizaje', function() {
      updatedTipoActividadesAprendizaje.name.should.equal('Updated TipoActividadesAprendizaje');
      updatedTipoActividadesAprendizaje.info.should.equal('This is the updated tipoActividadesAprendizaje!!!');
    });

  });

  describe('DELETE /api/tipo_actividades_aprendizaje/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/tipo_actividades_aprendizaje/' + newTipoActividadesAprendizaje._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when tipoActividadesAprendizaje does not exist', function(done) {
      request(app)
        .delete('/api/tipo_actividades_aprendizaje/' + newTipoActividadesAprendizaje._id)
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
