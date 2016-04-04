'use strict';

var app = require('../..');
import request from 'supertest';

var newConocimientosConceptosPrincipios;

describe('ConocimientosConceptosPrincipios API:', function() {

  describe('GET /api/conocimientos_conceptos_principios', function() {
    var conocimientosConceptosPrincipioss;

    beforeEach(function(done) {
      request(app)
        .get('/api/conocimientos_conceptos_principios')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          conocimientosConceptosPrincipioss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      conocimientosConceptosPrincipioss.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/conocimientos_conceptos_principios', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/conocimientos_conceptos_principios')
        .send({
          name: 'New ConocimientosConceptosPrincipios',
          info: 'This is the brand new conocimientosConceptosPrincipios!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newConocimientosConceptosPrincipios = res.body;
          done();
        });
    });

    it('should respond with the newly created conocimientosConceptosPrincipios', function() {
      newConocimientosConceptosPrincipios.name.should.equal('New ConocimientosConceptosPrincipios');
      newConocimientosConceptosPrincipios.info.should.equal('This is the brand new conocimientosConceptosPrincipios!!!');
    });

  });

  describe('GET /api/conocimientos_conceptos_principios/:id', function() {
    var conocimientosConceptosPrincipios;

    beforeEach(function(done) {
      request(app)
        .get('/api/conocimientos_conceptos_principios/' + newConocimientosConceptosPrincipios._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          conocimientosConceptosPrincipios = res.body;
          done();
        });
    });

    afterEach(function() {
      conocimientosConceptosPrincipios = {};
    });

    it('should respond with the requested conocimientosConceptosPrincipios', function() {
      conocimientosConceptosPrincipios.name.should.equal('New ConocimientosConceptosPrincipios');
      conocimientosConceptosPrincipios.info.should.equal('This is the brand new conocimientosConceptosPrincipios!!!');
    });

  });

  describe('PUT /api/conocimientos_conceptos_principios/:id', function() {
    var updatedConocimientosConceptosPrincipios;

    beforeEach(function(done) {
      request(app)
        .put('/api/conocimientos_conceptos_principios/' + newConocimientosConceptosPrincipios._id)
        .send({
          name: 'Updated ConocimientosConceptosPrincipios',
          info: 'This is the updated conocimientosConceptosPrincipios!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedConocimientosConceptosPrincipios = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedConocimientosConceptosPrincipios = {};
    });

    it('should respond with the updated conocimientosConceptosPrincipios', function() {
      updatedConocimientosConceptosPrincipios.name.should.equal('Updated ConocimientosConceptosPrincipios');
      updatedConocimientosConceptosPrincipios.info.should.equal('This is the updated conocimientosConceptosPrincipios!!!');
    });

  });

  describe('DELETE /api/conocimientos_conceptos_principios/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/conocimientos_conceptos_principios/' + newConocimientosConceptosPrincipios._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when conocimientosConceptosPrincipios does not exist', function(done) {
      request(app)
        .delete('/api/conocimientos_conceptos_principios/' + newConocimientosConceptosPrincipios._id)
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
