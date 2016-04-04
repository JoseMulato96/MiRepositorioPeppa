/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/novedades_instructor              ->  index
 * POST    /api/novedades_instructor              ->  create
 * GET     /api/novedades_instructor/:id          ->  show
 * PUT     /api/novedades_instructor/:id          ->  update
 * DELETE  /api/novedades_instructor/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {NovedadesInstructor} from '../../sqldb';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    return entity.updateAttributes(updates)
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of NovedadesInstructors
export function index(req, res) {
  return NovedadesInstructor.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single NovedadesInstructor from the DB
export function show(req, res) {
  return NovedadesInstructor.find({
    where: {
      id_novedad_instructor: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new NovedadesInstructor in the DB
export function create(req, res) {
  return NovedadesInstructor.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing NovedadesInstructor in the DB
export function update(req, res) {
  if (req.body.id_novedad_instructor) {
    delete req.body.id_novedad_instructor;
  }
  return NovedadesInstructor.find({
    where: {
      id_novedad_instructor: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a NovedadesInstructor from the DB
export function destroy(req, res) {
  return NovedadesInstructor.find({
    where: {
      id_novedad_instructor: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
