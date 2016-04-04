'use strict';

var app = require('../..');
import request from 'supertest';

var newSabanasHorarios;

describe('SabanasHorarios API:', function() {

  describe('GET /api/sabanas_horarios', function() {
    var sabanasHorarioss;

    beforeEach(function(done) {
      request(app)
        .get('/api/sabanas_horarios')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          sabanasHorarioss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      sabanasHorarioss.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/sabanas_horarios', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/sabanas_horarios')
        .send({
          name: 'New SabanasHorarios',
          info: 'This is the brand new sabanasHorarios!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newSabanasHorarios = res.body;
          done();
        });
    });

    it('should respond with the newly created sabanasHorarios', function() {
      newSabanasHorarios.name.should.equal('New SabanasHorarios');
      newSabanasHorarios.info.should.equal('This is the brand new sabanasHorarios!!!');
    });

  });

  describe('GET /api/sabanas_horarios/:id', function() {
    var sabanasHorarios;

    beforeEach(function(done) {
      request(app)
        .get('/api/sabanas_horarios/' + newSabanasHorarios._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          sabanasHorarios = res.body;
          done();
        });
    });

    afterEach(function() {
      sabanasHorarios = {};
    });

    it('should respond with the requested sabanasHorarios', function() {
      sabanasHorarios.name.should.equal('New SabanasHorarios');
      sabanasHorarios.info.should.equal('This is the brand new sabanasHorarios!!!');
    });

  });

  describe('PUT /api/sabanas_horarios/:id', function() {
    var updatedSabanasHorarios;

    beforeEach(function(done) {
      request(app)
        .put('/api/sabanas_horarios/' + newSabanasHorarios._id)
        .send({
          name: 'Updated SabanasHorarios',
          info: 'This is the updated sabanasHorarios!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSabanasHorarios = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSabanasHorarios = {};
    });

    it('should respond with the updated sabanasHorarios', function() {
      updatedSabanasHorarios.name.should.equal('Updated SabanasHorarios');
      updatedSabanasHorarios.info.should.equal('This is the updated sabanasHorarios!!!');
    });

  });

  describe('DELETE /api/sabanas_horarios/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/sabanas_horarios/' + newSabanasHorarios._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when sabanasHorarios does not exist', function(done) {
      request(app)
        .delete('/api/sabanas_horarios/' + newSabanasHorarios._id)
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
