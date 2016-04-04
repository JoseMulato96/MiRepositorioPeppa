'use strict';

var app = require('../..');
import request from 'supertest';

var newUsuarios;

describe('Usuarios API:', function() {

  describe('GET /api/usuarios', function() {
    var usuarioss;

    beforeEach(function(done) {
      request(app)
        .get('/api/usuarios')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          usuarioss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      usuarioss.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/usuarios', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/usuarios')
        .send({
          name: 'New Usuarios',
          info: 'This is the brand new usuarios!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newUsuarios = res.body;
          done();
        });
    });

    it('should respond with the newly created usuarios', function() {
      newUsuarios.name.should.equal('New Usuarios');
      newUsuarios.info.should.equal('This is the brand new usuarios!!!');
    });

  });

  describe('GET /api/usuarios/:id', function() {
    var usuarios;

    beforeEach(function(done) {
      request(app)
        .get('/api/usuarios/' + newUsuarios.id_usuario)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          usuarios = res.body;
          done();
        });
    });

    afterEach(function() {
      usuarios = {};
    });

    it('should respond with the requested usuarios', function() {
      usuarios.name.should.equal('New Usuarios');
      usuarios.info.should.equal('This is the brand new usuarios!!!');
    });

  });

  describe('PUT /api/usuarios/:id', function() {
    var updatedUsuarios;

    beforeEach(function(done) {
      request(app)
        .put('/api/usuarios/' + newUsuarios.id_usuario)
        .send({
          name: 'Updated Usuarios',
          info: 'This is the updated usuarios!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedUsuarios = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedUsuarios = {};
    });

    it('should respond with the updated usuarios', function() {
      updatedUsuarios.name.should.equal('Updated Usuarios');
      updatedUsuarios.info.should.equal('This is the updated usuarios!!!');
    });

  });

  describe('DELETE /api/usuarios/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/usuarios/' + newUsuarios.id_usuario)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when usuarios does not exist', function(done) {
      request(app)
        .delete('/api/usuarios/' + newUsuarios.id_usuario)
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
