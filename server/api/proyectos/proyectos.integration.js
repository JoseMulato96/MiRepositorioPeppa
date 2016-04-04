'use strict';

var app = require('../..');
import request from 'supertest';

var newProyectos;

describe('Proyectos API:', function() {

  describe('GET /api/proyectos', function() {
    var proyectoss;

    beforeEach(function(done) {
      request(app)
        .get('/api/proyectos')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          proyectoss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      proyectoss.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/proyectos', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/proyectos')
        .send({
          name: 'New Proyectos',
          info: 'This is the brand new proyectos!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newProyectos = res.body;
          done();
        });
    });

    it('should respond with the newly created proyectos', function() {
      newProyectos.name.should.equal('New Proyectos');
      newProyectos.info.should.equal('This is the brand new proyectos!!!');
    });

  });

  describe('GET /api/proyectos/:id', function() {
    var proyectos;

    beforeEach(function(done) {
      request(app)
        .get('/api/proyectos/' + newProyectos._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          proyectos = res.body;
          done();
        });
    });

    afterEach(function() {
      proyectos = {};
    });

    it('should respond with the requested proyectos', function() {
      proyectos.name.should.equal('New Proyectos');
      proyectos.info.should.equal('This is the brand new proyectos!!!');
    });

  });

  describe('PUT /api/proyectos/:id', function() {
    var updatedProyectos;

    beforeEach(function(done) {
      request(app)
        .put('/api/proyectos/' + newProyectos._id)
        .send({
          name: 'Updated Proyectos',
          info: 'This is the updated proyectos!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedProyectos = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedProyectos = {};
    });

    it('should respond with the updated proyectos', function() {
      updatedProyectos.name.should.equal('Updated Proyectos');
      updatedProyectos.info.should.equal('This is the updated proyectos!!!');
    });

  });

  describe('DELETE /api/proyectos/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/proyectos/' + newProyectos._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when proyectos does not exist', function(done) {
      request(app)
        .delete('/api/proyectos/' + newProyectos._id)
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
