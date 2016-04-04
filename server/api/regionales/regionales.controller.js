/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/regionales              ->  index
 * POST    /api/regionales              ->  create
 * GET     /api/regionales/:id          ->  show
 * PUT     /api/regionales/:id          ->  update
 * DELETE  /api/regionales/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {Regionales} from '../../sqldb';

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

// Gets a list of Regionaless
export function index(req, res) {
  return Regionales.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Regionales from the DB
export function show(req, res) {
  return Regionales.find({
    where: {
      id_regional: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Regionales in the DB
export function create(req, res) {
  return Regionales.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Regionales in the DB
export function update(req, res) {
  if (req.body.id_regional) {
    delete req.body.id_regional;
  }
  return Regionales.find({
    where: {
      id_regional: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Regionales from the DB
export function destroy(req, res) {
  return Regionales.find({
    where: {
      id_regional: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
