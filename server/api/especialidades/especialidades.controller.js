/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/especialidades              ->  index
 * POST    /api/especialidades              ->  create
 * GET     /api/especialidades/:id          ->  show
 * PUT     /api/especialidades/:id          ->  update
 * DELETE  /api/especialidades/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {Especialidades} from '../../sqldb';

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

// Gets a list of Especialidadess
export function index(req, res) {
  return Especialidades.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Especialidades from the DB
export function show(req, res) {
  return Especialidades.find({
    where: {
      idEspecialidad: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Especialidades in the DB
export function create(req, res) {
  return Especialidades.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Especialidades in the DB
export function update(req, res) {
  if (req.body.idEspecialidad) {
    delete req.body.idEspecialidad;
  }
  return Especialidades.find({
    where: {
      idEspecialidad: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Especialidades from the DB
export function destroy(req, res) {
  return Especialidades.find({
    where: {
      idEspecialidad: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
