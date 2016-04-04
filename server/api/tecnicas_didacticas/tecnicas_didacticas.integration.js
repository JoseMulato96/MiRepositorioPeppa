'use strict';

var app = require('../..');
import request from 'supertest';

var newTecnicasDidacticas;

describe('TecnicasDidacticas API:', function() {

  describe('GET /api/tecnicas_didacticas', function() {
    var tecnicasDidacticass;

    beforeEach(function(done) {
      request(app)
        .get('/api/tecnicas_didacticas')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          tecnicasDidacticass = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      tecnicasDidacticass.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/tecnicas_didacticas', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/tecnicas_didacticas')
        .send({
          name: 'New TecnicasDidacticas',
          info: 'This is the brand new tecnicasDidacticas!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newTecnicasDidacticas = res.body;
          done();
        });
    });

    it('should respond with the newly created tecnicasDidacticas', function() {
      newTecnicasDidacticas.name.should.equal('New TecnicasDidacticas');
      newTecnicasDidacticas.info.should.equal('This is the brand new tecnicasDidacticas!!!');
    });

  });

  describe('GET /api/tecnicas_didacticas/:id', function() {
    var tecnicasDidacticas;

    beforeEach(function(done) {
      request(app)
        .get('/api/tecnicas_didacticas/' + newTecnicasDidacticas._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          tecnicasDidacticas = res.body;
          done();
        });
    });

    afterEach(function() {
      tecnicasDidacticas = {};
    });

    it('should respond with the requested tecnicasDidacticas', function() {
      tecnicasDidacticas.name.should.equal('New TecnicasDidacticas');
      tecnicasDidacticas.info.should.equal('This is the brand new tecnicasDidacticas!!!');
    });

  });

  describe('PUT /api/tecnicas_didacticas/:id', function() {
    var updatedTecnicasDidacticas;

    beforeEach(function(done) {
      request(app)
        .put('/api/tecnicas_didacticas/' + newTecnicasDidacticas._id)
        .send({
          name: 'Updated TecnicasDidacticas',
          info: 'This is the updated tecnicasDidacticas!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTecnicasDidacticas = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTecnicasDidacticas = {};
    });

    it('should respond with the updated tecnicasDidacticas', function() {
      updatedTecnicasDidacticas.name.should.equal('Updated TecnicasDidacticas');
      updatedTecnicasDidacticas.info.should.equal('This is the updated tecnicasDidacticas!!!');
    });

  });

  describe('DELETE /api/tecnicas_didacticas/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/tecnicas_didacticas/' + newTecnicasDidacticas._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when tecnicasDidacticas does not exist', function(done) {
      request(app)
        .delete('/api/tecnicas_didacticas/' + newTecnicasDidacticas._id)
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
