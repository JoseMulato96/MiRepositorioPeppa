/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/jornadas              ->  index
 * POST    /api/jornadas              ->  create
 * GET     /api/jornadas/:id          ->  show
 * PUT     /api/jornadas/:id          ->  update
 * DELETE  /api/jornadas/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {Jornadas} from '../../sqldb';

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

// Gets a list of Jornadass
export function index(req, res) {
  return Jornadas.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Jornadas from the DB
export function show(req, res) {
  return Jornadas.find({
    where: {
      id_jornada: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Jornadas in the DB
export function create(req, res) {
  return Jornadas.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Jornadas in the DB
export function update(req, res) {
  if (req.body.id_jornada) {
    delete req.body.id_jornada;
  }
  return Jornadas.find({
    where: {
      id_jornada: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Jornadas from the DB
export function destroy(req, res) {
  return Jornadas.find({
    where: {
      id_jornada: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
