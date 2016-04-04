'use strict';

var app = require('../..');
import request from 'supertest';

var newEstados;

describe('Estados API:', function() {

  describe('GET /api/estados', function() {
    var estadoss;

    beforeEach(function(done) {
      request(app)
        .get('/api/estados')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          estadoss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      estadoss.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/estados', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/estados')
        .send({
          name: 'New Estados',
          info: 'This is the brand new estados!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newEstados = res.body;
          done();
        });
    });

    it('should respond with the newly created estados', function() {
      newEstados.name.should.equal('New Estados');
      newEstados.info.should.equal('This is the brand new estados!!!');
    });

  });

  describe('GET /api/estados/:id', function() {
    var estados;

    beforeEach(function(done) {
      request(app)
        .get('/api/estados/' + newEstados.id_estado)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          estados = res.body;
          done();
        });
    });

    afterEach(function() {
      estados = {};
    });

    it('should respond with the requested estados', function() {
      estados.name.should.equal('New Estados');
      estados.info.should.equal('This is the brand new estados!!!');
    });

  });

  describe('PUT /api/estados/:id', function() {
    var updatedEstados;

    beforeEach(function(done) {
      request(app)
        .put('/api/estados/' + newEstados.id_estado)
        .send({
          name: 'Updated Estados',
          info: 'This is the updated estados!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedEstados = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedEstados = {};
    });

    it('should respond with the updated estados', function() {
      updatedEstados.name.should.equal('Updated Estados');
      updatedEstados.info.should.equal('This is the updated estados!!!');
    });

  });

  describe('DELETE /api/estados/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/estados/' + newEstados.id_estado)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when estados does not exist', function(done) {
      request(app)
        .delete('/api/estados/' + newEstados.id_estado)
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
