'use strict';

var app = require('../..');
import request from 'supertest';

var newAreas;

describe('Areas API:', function() {

  describe('GET /api/areas', function() {
    var areass;

    beforeEach(function(done) {
      request(app)
        .get('/api/areas')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          areass = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      areass.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/areas', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/areas')
        .send({
          name: 'New Areas',
          info: 'This is the brand new areas!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newAreas = res.body;
          done();
        });
    });

    it('should respond with the newly created areas', function() {
      newAreas.name.should.equal('New Areas');
      newAreas.info.should.equal('This is the brand new areas!!!');
    });

  });

  describe('GET /api/areas/:id', function() {
    var areas;

    beforeEach(function(done) {
      request(app)
        .get('/api/areas/' + newAreas.id_area)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          areas = res.body;
          done();
        });
    });

    afterEach(function() {
      areas = {};
    });

    it('should respond with the requested areas', function() {
      areas.name.should.equal('New Areas');
      areas.info.should.equal('This is the brand new areas!!!');
    });

  });

  describe('PUT /api/areas/:id', function() {
    var updatedAreas;

    beforeEach(function(done) {
      request(app)
        .put('/api/areas/' + newAreas.id_area)
        .send({
          name: 'Updated Areas',
          info: 'This is the updated areas!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedAreas = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedAreas = {};
    });

    it('should respond with the updated areas', function() {
      updatedAreas.name.should.equal('Updated Areas');
      updatedAreas.info.should.equal('This is the updated areas!!!');
    });

  });

  describe('DELETE /api/areas/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/areas/' + newAreas.id_area)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when areas does not exist', function(done) {
      request(app)
        .delete('/api/areas/' + newAreas.id_area)
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
