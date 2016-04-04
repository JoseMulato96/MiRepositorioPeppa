'use strict';

var app = require('../..');
import request from 'supertest';

var newTiposFormacion;

describe('TiposFormacion API:', function() {

  describe('GET /api/tipos_formacion', function() {
    var tiposFormacions;

    beforeEach(function(done) {
      request(app)
        .get('/api/tipos_formacion')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          tiposFormacions = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      tiposFormacions.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/tipos_formacion', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/tipos_formacion')
        .send({
          name: 'New TiposFormacion',
          info: 'This is the brand new tiposFormacion!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newTiposFormacion = res.body;
          done();
        });
    });

    it('should respond with the newly created tiposFormacion', function() {
      newTiposFormacion.name.should.equal('New TiposFormacion');
      newTiposFormacion.info.should.equal('This is the brand new tiposFormacion!!!');
    });

  });

  describe('GET /api/tipos_formacion/:id', function() {
    var tiposFormacion;

    beforeEach(function(done) {
      request(app)
        .get('/api/tipos_formacion/' + newTiposFormacion._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          tiposFormacion = res.body;
          done();
        });
    });

    afterEach(function() {
      tiposFormacion = {};
    });

    it('should respond with the requested tiposFormacion', function() {
      tiposFormacion.name.should.equal('New TiposFormacion');
      tiposFormacion.info.should.equal('This is the brand new tiposFormacion!!!');
    });

  });

  describe('PUT /api/tipos_formacion/:id', function() {
    var updatedTiposFormacion;

    beforeEach(function(done) {
      request(app)
        .put('/api/tipos_formacion/' + newTiposFormacion._id)
        .send({
          name: 'Updated TiposFormacion',
          info: 'This is the updated tiposFormacion!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTiposFormacion = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTiposFormacion = {};
    });

    it('should respond with the updated tiposFormacion', function() {
      updatedTiposFormacion.name.should.equal('Updated TiposFormacion');
      updatedTiposFormacion.info.should.equal('This is the updated tiposFormacion!!!');
    });

  });

  describe('DELETE /api/tipos_formacion/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/tipos_formacion/' + newTiposFormacion._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when tiposFormacion does not exist', function(done) {
      request(app)
        .delete('/api/tipos_formacion/' + newTiposFormacion._id)
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
