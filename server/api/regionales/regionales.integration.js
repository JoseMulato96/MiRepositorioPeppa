'use strict';

var app = require('../..');
import request from 'supertest';

var newRegionales;

describe('Regionales API:', function() {

  describe('GET /api/regionales', function() {
    var regionaless;

    beforeEach(function(done) {
      request(app)
        .get('/api/regionales')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          regionaless = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      regionaless.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/regionales', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/regionales')
        .send({
          name: 'New Regionales',
          info: 'This is the brand new regionales!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newRegionales = res.body;
          done();
        });
    });

    it('should respond with the newly created regionales', function() {
      newRegionales.name.should.equal('New Regionales');
      newRegionales.info.should.equal('This is the brand new regionales!!!');
    });

  });

  describe('GET /api/regionales/:id', function() {
    var regionales;

    beforeEach(function(done) {
      request(app)
        .get('/api/regionales/' + newRegionales.id_regional)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          regionales = res.body;
          done();
        });
    });

    afterEach(function() {
      regionales = {};
    });

    it('should respond with the requested regionales', function() {
      regionales.name.should.equal('New Regionales');
      regionales.info.should.equal('This is the brand new regionales!!!');
    });

  });

  describe('PUT /api/regionales/:id', function() {
    var updatedRegionales;

    beforeEach(function(done) {
      request(app)
        .put('/api/regionales/' + newRegionales.id_regional)
        .send({
          name: 'Updated Regionales',
          info: 'This is the updated regionales!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedRegionales = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedRegionales = {};
    });

    it('should respond with the updated regionales', function() {
      updatedRegionales.name.should.equal('Updated Regionales');
      updatedRegionales.info.should.equal('This is the updated regionales!!!');
    });

  });

  describe('DELETE /api/regionales/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/regionales/' + newRegionales.id_regional)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when regionales does not exist', function(done) {
      request(app)
        .delete('/api/regionales/' + newRegionales.id_regional)
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
