'use strict';

var app = require('../..');
import request from 'supertest';

var newDetallesSabanasHorarios;

describe('DetallesSabanasHorarios API:', function() {

  describe('GET /api/detalles_sabanas_horarios', function() {
    var detallesSabanasHorarioss;

    beforeEach(function(done) {
      request(app)
        .get('/api/detalles_sabanas_horarios')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          detallesSabanasHorarioss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      detallesSabanasHorarioss.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/detalles_sabanas_horarios', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/detalles_sabanas_horarios')
        .send({
          name: 'New DetallesSabanasHorarios',
          info: 'This is the brand new detallesSabanasHorarios!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newDetallesSabanasHorarios = res.body;
          done();
        });
    });

    it('should respond with the newly created detallesSabanasHorarios', function() {
      newDetallesSabanasHorarios.name.should.equal('New DetallesSabanasHorarios');
      newDetallesSabanasHorarios.info.should.equal('This is the brand new detallesSabanasHorarios!!!');
    });

  });

  describe('GET /api/detalles_sabanas_horarios/:id', function() {
    var detallesSabanasHorarios;

    beforeEach(function(done) {
      request(app)
        .get('/api/detalles_sabanas_horarios/' + newDetallesSabanasHorarios._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          detallesSabanasHorarios = res.body;
          done();
        });
    });

    afterEach(function() {
      detallesSabanasHorarios = {};
    });

    it('should respond with the requested detallesSabanasHorarios', function() {
      detallesSabanasHorarios.name.should.equal('New DetallesSabanasHorarios');
      detallesSabanasHorarios.info.should.equal('This is the brand new detallesSabanasHorarios!!!');
    });

  });

  describe('PUT /api/detalles_sabanas_horarios/:id', function() {
    var updatedDetallesSabanasHorarios;

    beforeEach(function(done) {
      request(app)
        .put('/api/detalles_sabanas_horarios/' + newDetallesSabanasHorarios._id)
        .send({
          name: 'Updated DetallesSabanasHorarios',
          info: 'This is the updated detallesSabanasHorarios!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedDetallesSabanasHorarios = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedDetallesSabanasHorarios = {};
    });

    it('should respond with the updated detallesSabanasHorarios', function() {
      updatedDetallesSabanasHorarios.name.should.equal('Updated DetallesSabanasHorarios');
      updatedDetallesSabanasHorarios.info.should.equal('This is the updated detallesSabanasHorarios!!!');
    });

  });

  describe('DELETE /api/detalles_sabanas_horarios/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/detalles_sabanas_horarios/' + newDetallesSabanasHorarios._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when detallesSabanasHorarios does not exist', function(done) {
      request(app)
        .delete('/api/detalles_sabanas_horarios/' + newDetallesSabanasHorarios._id)
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
