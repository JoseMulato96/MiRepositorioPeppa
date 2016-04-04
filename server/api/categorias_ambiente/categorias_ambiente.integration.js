'use strict';

var app = require('../..');
import request from 'supertest';

var newCategoriasAmbiente;

describe('CategoriasAmbiente API:', function() {

  describe('GET /api/categorias_ambiente', function() {
    var categoriasAmbientes;

    beforeEach(function(done) {
      request(app)
        .get('/api/categorias_ambiente')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          categoriasAmbientes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      categoriasAmbientes.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/categorias_ambiente', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/categorias_ambiente')
        .send({
          name: 'New CategoriasAmbiente',
          info: 'This is the brand new categoriasAmbiente!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newCategoriasAmbiente = res.body;
          done();
        });
    });

    it('should respond with the newly created categoriasAmbiente', function() {
      newCategoriasAmbiente.name.should.equal('New CategoriasAmbiente');
      newCategoriasAmbiente.info.should.equal('This is the brand new categoriasAmbiente!!!');
    });

  });

  describe('GET /api/categorias_ambiente/:id', function() {
    var categoriasAmbiente;

    beforeEach(function(done) {
      request(app)
        .get('/api/categorias_ambiente/' + newCategoriasAmbiente.id_categoria_ambiente)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          categoriasAmbiente = res.body;
          done();
        });
    });

    afterEach(function() {
      categoriasAmbiente = {};
    });

    it('should respond with the requested categoriasAmbiente', function() {
      categoriasAmbiente.name.should.equal('New CategoriasAmbiente');
      categoriasAmbiente.info.should.equal('This is the brand new categoriasAmbiente!!!');
    });

  });

  describe('PUT /api/categorias_ambiente/:id', function() {
    var updatedCategoriasAmbiente;

    beforeEach(function(done) {
      request(app)
        .put('/api/categorias_ambiente/' + newCategoriasAmbiente.id_categoria_ambiente)
        .send({
          name: 'Updated CategoriasAmbiente',
          info: 'This is the updated categoriasAmbiente!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCategoriasAmbiente = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCategoriasAmbiente = {};
    });

    it('should respond with the updated categoriasAmbiente', function() {
      updatedCategoriasAmbiente.name.should.equal('Updated CategoriasAmbiente');
      updatedCategoriasAmbiente.info.should.equal('This is the updated categoriasAmbiente!!!');
    });

  });

  describe('DELETE /api/categorias_ambiente/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/categorias_ambiente/' + newCategoriasAmbiente.id_categoria_ambiente)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when categoriasAmbiente does not exist', function(done) {
      request(app)
        .delete('/api/categorias_ambiente/' + newCategoriasAmbiente.id_categoria_ambiente)
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
