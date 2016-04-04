'use strict';

var app = require('../..');
import request from 'supertest';

var newTiposSangre;

describe('TiposSangre API:', function() {

  describe('GET /api/tipos_sangre', function() {
    var tiposSangres;

    beforeEach(function(done) {
      request(app)
        .get('/api/tipos_sangre')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          tiposSangres = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      tiposSangres.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/tipos_sangre', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/tipos_sangre')
        .send({
          name: 'New TiposSangre',
          info: 'This is the brand new tiposSangre!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newTiposSangre = res.body;
          done();
        });
    });

    it('should respond with the newly created tiposSangre', function() {
      newTiposSangre.name.should.equal('New TiposSangre');
      newTiposSangre.info.should.equal('This is the brand new tiposSangre!!!');
    });

  });

  describe('GET /api/tipos_sangre/:id', function() {
    var tiposSangre;

    beforeEach(function(done) {
      request(app)
        .get('/api/tipos_sangre/' + newTiposSangre.id_tipo_sangre)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          tiposSangre = res.body;
          done();
        });
    });

    afterEach(function() {
      tiposSangre = {};
    });

    it('should respond with the requested tiposSangre', function() {
      tiposSangre.name.should.equal('New TiposSangre');
      tiposSangre.info.should.equal('This is the brand new tiposSangre!!!');
    });

  });

  describe('PUT /api/tipos_sangre/:id', function() {
    var updatedTiposSangre;

    beforeEach(function(done) {
      request(app)
        .put('/api/tipos_sangre/' + newTiposSangre.id_tipo_sangre)
        .send({
          name: 'Updated TiposSangre',
          info: 'This is the updated tiposSangre!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTiposSangre = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTiposSangre = {};
    });

    it('should respond with the updated tiposSangre', function() {
      updatedTiposSangre.name.should.equal('Updated TiposSangre');
      updatedTiposSangre.info.should.equal('This is the updated tiposSangre!!!');
    });

  });

  describe('DELETE /api/tipos_sangre/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/tipos_sangre/' + newTiposSangre.id_tipo_sangre)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when tiposSangre does not exist', function(done) {
      request(app)
        .delete('/api/tipos_sangre/' + newTiposSangre.id_tipo_sangre)
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
