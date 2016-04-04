'use strict';

var app = require('../..');
import request from 'supertest';

var newTiposRubro;

describe('TiposRubro API:', function() {

  describe('GET /api/tipos_rubro', function() {
    var tiposRubros;

    beforeEach(function(done) {
      request(app)
        .get('/api/tipos_rubro')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          tiposRubros = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      tiposRubros.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/tipos_rubro', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/tipos_rubro')
        .send({
          name: 'New TiposRubro',
          info: 'This is the brand new tiposRubro!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newTiposRubro = res.body;
          done();
        });
    });

    it('should respond with the newly created tiposRubro', function() {
      newTiposRubro.name.should.equal('New TiposRubro');
      newTiposRubro.info.should.equal('This is the brand new tiposRubro!!!');
    });

  });

  describe('GET /api/tipos_rubro/:id', function() {
    var tiposRubro;

    beforeEach(function(done) {
      request(app)
        .get('/api/tipos_rubro/' + newTiposRubro._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          tiposRubro = res.body;
          done();
        });
    });

    afterEach(function() {
      tiposRubro = {};
    });

    it('should respond with the requested tiposRubro', function() {
      tiposRubro.name.should.equal('New TiposRubro');
      tiposRubro.info.should.equal('This is the brand new tiposRubro!!!');
    });

  });

  describe('PUT /api/tipos_rubro/:id', function() {
    var updatedTiposRubro;

    beforeEach(function(done) {
      request(app)
        .put('/api/tipos_rubro/' + newTiposRubro._id)
        .send({
          name: 'Updated TiposRubro',
          info: 'This is the updated tiposRubro!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTiposRubro = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTiposRubro = {};
    });

    it('should respond with the updated tiposRubro', function() {
      updatedTiposRubro.name.should.equal('Updated TiposRubro');
      updatedTiposRubro.info.should.equal('This is the updated tiposRubro!!!');
    });

  });

  describe('DELETE /api/tipos_rubro/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/tipos_rubro/' + newTiposRubro._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when tiposRubro does not exist', function(done) {
      request(app)
        .delete('/api/tipos_rubro/' + newTiposRubro._id)
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
