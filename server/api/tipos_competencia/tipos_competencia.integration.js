'use strict';

var app = require('../..');
import request from 'supertest';

var newTiposCompetencia;

describe('TiposCompetencia API:', function() {

  describe('GET /api/tipos_competencia', function() {
    var tiposCompetencias;

    beforeEach(function(done) {
      request(app)
        .get('/api/tipos_competencia')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          tiposCompetencias = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      tiposCompetencias.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/tipos_competencia', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/tipos_competencia')
        .send({
          name: 'New TiposCompetencia',
          info: 'This is the brand new tiposCompetencia!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newTiposCompetencia = res.body;
          done();
        });
    });

    it('should respond with the newly created tiposCompetencia', function() {
      newTiposCompetencia.name.should.equal('New TiposCompetencia');
      newTiposCompetencia.info.should.equal('This is the brand new tiposCompetencia!!!');
    });

  });

  describe('GET /api/tipos_competencia/:id', function() {
    var tiposCompetencia;

    beforeEach(function(done) {
      request(app)
        .get('/api/tipos_competencia/' + newTiposCompetencia._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          tiposCompetencia = res.body;
          done();
        });
    });

    afterEach(function() {
      tiposCompetencia = {};
    });

    it('should respond with the requested tiposCompetencia', function() {
      tiposCompetencia.name.should.equal('New TiposCompetencia');
      tiposCompetencia.info.should.equal('This is the brand new tiposCompetencia!!!');
    });

  });

  describe('PUT /api/tipos_competencia/:id', function() {
    var updatedTiposCompetencia;

    beforeEach(function(done) {
      request(app)
        .put('/api/tipos_competencia/' + newTiposCompetencia._id)
        .send({
          name: 'Updated TiposCompetencia',
          info: 'This is the updated tiposCompetencia!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTiposCompetencia = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTiposCompetencia = {};
    });

    it('should respond with the updated tiposCompetencia', function() {
      updatedTiposCompetencia.name.should.equal('Updated TiposCompetencia');
      updatedTiposCompetencia.info.should.equal('This is the updated tiposCompetencia!!!');
    });

  });

  describe('DELETE /api/tipos_competencia/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/tipos_competencia/' + newTiposCompetencia._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when tiposCompetencia does not exist', function(done) {
      request(app)
        .delete('/api/tipos_competencia/' + newTiposCompetencia._id)
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
