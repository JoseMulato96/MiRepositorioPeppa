'use strict';

var app = require('../..');
import request from 'supertest';

var newActividades;

describe('Actividades API:', function() {

  describe('GET /api/actividades', function() {
    var actividadess;

    beforeEach(function(done) {
      request(app)
        .get('/api/actividades')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          actividadess = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      actividadess.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/actividades', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/actividades')
        .send({
          name: 'New Actividades',
          info: 'This is the brand new actividades!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newActividades = res.body;
          done();
        });
    });

    it('should respond with the newly created actividades', function() {
      newActividades.name.should.equal('New Actividades');
      newActividades.info.should.equal('This is the brand new actividades!!!');
    });

  });

  describe('GET /api/actividades/:id', function() {
    var actividades;

    beforeEach(function(done) {
      request(app)
        .get('/api/actividades/' + newActividades._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          actividades = res.body;
          done();
        });
    });

    afterEach(function() {
      actividades = {};
    });

    it('should respond with the requested actividades', function() {
      actividades.name.should.equal('New Actividades');
      actividades.info.should.equal('This is the brand new actividades!!!');
    });

  });

  describe('PUT /api/actividades/:id', function() {
    var updatedActividades;

    beforeEach(function(done) {
      request(app)
        .put('/api/actividades/' + newActividades._id)
        .send({
          name: 'Updated Actividades',
          info: 'This is the updated actividades!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedActividades = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedActividades = {};
    });

    it('should respond with the updated actividades', function() {
      updatedActividades.name.should.equal('Updated Actividades');
      updatedActividades.info.should.equal('This is the updated actividades!!!');
    });

  });

  describe('DELETE /api/actividades/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/actividades/' + newActividades._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when actividades does not exist', function(done) {
      request(app)
        .delete('/api/actividades/' + newActividades._id)
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
