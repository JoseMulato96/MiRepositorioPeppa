/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/recursos              ->  index
 * POST    /api/recursos              ->  create
 * GET     /api/recursos/:id          ->  show
 * PUT     /api/recursos/:id          ->  update
 * DELETE  /api/recursos/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {Recursos} from '../../sqldb';

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

// Gets a list of Recursoss
export function index(req, res) {
  return Recursos.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Recursos from the DB
export function show(req, res) {
  return Recursos.find({
    where: {
      id_recurso: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Recursos in the DB
export function create(req, res) {
  return Recursos.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Recursos in the DB
export function update(req, res) {
  if (req.body.id_recurso) {
    delete req.body.id_recurso;
  }
  return Recursos.find({
    where: {
      id_recurso: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Recursos from the DB
export function destroy(req, res) {
  return Recursos.find({
    where: {
      id_recurso: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
