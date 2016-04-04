/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/tipos_instuctor              ->  index
 * POST    /api/tipos_instuctor              ->  create
 * GET     /api/tipos_instuctor/:id          ->  show
 * PUT     /api/tipos_instuctor/:id          ->  update
 * DELETE  /api/tipos_instuctor/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {TiposInstructor} from '../../sqldb';

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

// Gets a list of TiposInstructors
export function index(req, res) {
  return TiposInstructor.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single TiposInstructor from the DB
export function show(req, res) {
  return TiposInstructor.find({
    where: {
      id_tipo_instructor: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new TiposInstructor in the DB
export function create(req, res) {
  return TiposInstructor.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing TiposInstructor in the DB
export function update(req, res) {
  if (req.body.id_tipo_instructor) {
    delete req.body.id_tipo_instructor;
  }
  return TiposInstructor.find({
    where: {
      id_tipo_instructor: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a TiposInstructor from the DB
export function destroy(req, res) {
  return TiposInstructor.find({
    where: {
      id_tipo_instructor: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
