'use strict';

var app = require('../..');
import request from 'supertest';

var newGuiasAprendizaje;

describe('GuiasAprendizaje API:', function() {

  describe('GET /api/guias_aprendizaje', function() {
    var guiasAprendizajes;

    beforeEach(function(done) {
      request(app)
        .get('/api/guias_aprendizaje')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          guiasAprendizajes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      guiasAprendizajes.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/guias_aprendizaje', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/guias_aprendizaje')
        .send({
          name: 'New GuiasAprendizaje',
          info: 'This is the brand new guiasAprendizaje!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newGuiasAprendizaje = res.body;
          done();
        });
    });

    it('should respond with the newly created guiasAprendizaje', function() {
      newGuiasAprendizaje.name.should.equal('New GuiasAprendizaje');
      newGuiasAprendizaje.info.should.equal('This is the brand new guiasAprendizaje!!!');
    });

  });

  describe('GET /api/guias_aprendizaje/:id', function() {
    var guiasAprendizaje;

    beforeEach(function(done) {
      request(app)
        .get('/api/guias_aprendizaje/' + newGuiasAprendizaje._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          guiasAprendizaje = res.body;
          done();
        });
    });

    afterEach(function() {
      guiasAprendizaje = {};
    });

    it('should respond with the requested guiasAprendizaje', function() {
      guiasAprendizaje.name.should.equal('New GuiasAprendizaje');
      guiasAprendizaje.info.should.equal('This is the brand new guiasAprendizaje!!!');
    });

  });

  describe('PUT /api/guias_aprendizaje/:id', function() {
    var updatedGuiasAprendizaje;

    beforeEach(function(done) {
      request(app)
        .put('/api/guias_aprendizaje/' + newGuiasAprendizaje._id)
        .send({
          name: 'Updated GuiasAprendizaje',
          info: 'This is the updated guiasAprendizaje!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedGuiasAprendizaje = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedGuiasAprendizaje = {};
    });

    it('should respond with the updated guiasAprendizaje', function() {
      updatedGuiasAprendizaje.name.should.equal('Updated GuiasAprendizaje');
      updatedGuiasAprendizaje.info.should.equal('This is the updated guiasAprendizaje!!!');
    });

  });

  describe('DELETE /api/guias_aprendizaje/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/guias_aprendizaje/' + newGuiasAprendizaje._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when guiasAprendizaje does not exist', function(done) {
      request(app)
        .delete('/api/guias_aprendizaje/' + newGuiasAprendizaje._id)
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
