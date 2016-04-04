'use strict';

var app = require('../..');
import request from 'supertest';

var newProgramas;

describe('Programas API:', function() {

  describe('GET /api/programas', function() {
    var programass;

    beforeEach(function(done) {
      request(app)
        .get('/api/programas')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          programass = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      programass.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/programas', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/programas')
        .send({
          name: 'New Programas',
          info: 'This is the brand new programas!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newProgramas = res.body;
          done();
        });
    });

    it('should respond with the newly created programas', function() {
      newProgramas.name.should.equal('New Programas');
      newProgramas.info.should.equal('This is the brand new programas!!!');
    });

  });

  describe('GET /api/programas/:id', function() {
    var programas;

    beforeEach(function(done) {
      request(app)
        .get('/api/programas/' + newProgramas._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          programas = res.body;
          done();
        });
    });

    afterEach(function() {
      programas = {};
    });

    it('should respond with the requested programas', function() {
      programas.name.should.equal('New Programas');
      programas.info.should.equal('This is the brand new programas!!!');
    });

  });

  describe('PUT /api/programas/:id', function() {
    var updatedProgramas;

    beforeEach(function(done) {
      request(app)
        .put('/api/programas/' + newProgramas._id)
        .send({
          name: 'Updated Programas',
          info: 'This is the updated programas!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedProgramas = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedProgramas = {};
    });

    it('should respond with the updated programas', function() {
      updatedProgramas.name.should.equal('Updated Programas');
      updatedProgramas.info.should.equal('This is the updated programas!!!');
    });

  });

  describe('DELETE /api/programas/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/programas/' + newProgramas._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when programas does not exist', function(done) {
      request(app)
        .delete('/api/programas/' + newProgramas._id)
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
