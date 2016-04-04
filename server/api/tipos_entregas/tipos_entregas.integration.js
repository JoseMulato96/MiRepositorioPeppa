'use strict';

var app = require('../..');
import request from 'supertest';

var newTiposEntregas;

describe('TiposEntregas API:', function() {

  describe('GET /api/tipos_entregas', function() {
    var tiposEntregass;

    beforeEach(function(done) {
      request(app)
        .get('/api/tipos_entregas')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          tiposEntregass = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      tiposEntregass.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/tipos_entregas', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/tipos_entregas')
        .send({
          name: 'New TiposEntregas',
          info: 'This is the brand new tiposEntregas!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newTiposEntregas = res.body;
          done();
        });
    });

    it('should respond with the newly created tiposEntregas', function() {
      newTiposEntregas.name.should.equal('New TiposEntregas');
      newTiposEntregas.info.should.equal('This is the brand new tiposEntregas!!!');
    });

  });

  describe('GET /api/tipos_entregas/:id', function() {
    var tiposEntregas;

    beforeEach(function(done) {
      request(app)
        .get('/api/tipos_entregas/' + newTiposEntregas._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          tiposEntregas = res.body;
          done();
        });
    });

    afterEach(function() {
      tiposEntregas = {};
    });

    it('should respond with the requested tiposEntregas', function() {
      tiposEntregas.name.should.equal('New TiposEntregas');
      tiposEntregas.info.should.equal('This is the brand new tiposEntregas!!!');
    });

  });

  describe('PUT /api/tipos_entregas/:id', function() {
    var updatedTiposEntregas;

    beforeEach(function(done) {
      request(app)
        .put('/api/tipos_entregas/' + newTiposEntregas._id)
        .send({
          name: 'Updated TiposEntregas',
          info: 'This is the updated tiposEntregas!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTiposEntregas = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTiposEntregas = {};
    });

    it('should respond with the updated tiposEntregas', function() {
      updatedTiposEntregas.name.should.equal('Updated TiposEntregas');
      updatedTiposEntregas.info.should.equal('This is the updated tiposEntregas!!!');
    });

  });

  describe('DELETE /api/tipos_entregas/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/tipos_entregas/' + newTiposEntregas._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when tiposEntregas does not exist', function(done) {
      request(app)
        .delete('/api/tipos_entregas/' + newTiposEntregas._id)
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
