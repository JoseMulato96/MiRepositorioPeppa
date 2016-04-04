'use strict';

var app = require('../..');
import request from 'supertest';

var newLibretasMilitar;

describe('LibretasMilitar API:', function() {

  describe('GET /api/libretas_militar', function() {
    var libretasMilitars;

    beforeEach(function(done) {
      request(app)
        .get('/api/libretas_militar')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          libretasMilitars = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      libretasMilitars.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/libretas_militar', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/libretas_militar')
        .send({
          name: 'New LibretasMilitar',
          info: 'This is the brand new libretasMilitar!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newLibretasMilitar = res.body;
          done();
        });
    });

    it('should respond with the newly created libretasMilitar', function() {
      newLibretasMilitar.name.should.equal('New LibretasMilitar');
      newLibretasMilitar.info.should.equal('This is the brand new libretasMilitar!!!');
    });

  });

  describe('GET /api/libretas_militar/:id', function() {
    var libretasMilitar;

    beforeEach(function(done) {
      request(app)
        .get('/api/libretas_militar/' + newLibretasMilitar.id_libreta_militar)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          libretasMilitar = res.body;
          done();
        });
    });

    afterEach(function() {
      libretasMilitar = {};
    });

    it('should respond with the requested libretasMilitar', function() {
      libretasMilitar.name.should.equal('New LibretasMilitar');
      libretasMilitar.info.should.equal('This is the brand new libretasMilitar!!!');
    });

  });

  describe('PUT /api/libretas_militar/:id', function() {
    var updatedLibretasMilitar;

    beforeEach(function(done) {
      request(app)
        .put('/api/libretas_militar/' + newLibretasMilitar.id_libreta_militar)
        .send({
          name: 'Updated LibretasMilitar',
          info: 'This is the updated libretasMilitar!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedLibretasMilitar = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedLibretasMilitar = {};
    });

    it('should respond with the updated libretasMilitar', function() {
      updatedLibretasMilitar.name.should.equal('Updated LibretasMilitar');
      updatedLibretasMilitar.info.should.equal('This is the updated libretasMilitar!!!');
    });

  });

  describe('DELETE /api/libretas_militar/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/libretas_militar/' + newLibretasMilitar.id_libreta_militar)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when libretasMilitar does not exist', function(done) {
      request(app)
        .delete('/api/libretas_militar/' + newLibretasMilitar.id_libreta_militar)
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
