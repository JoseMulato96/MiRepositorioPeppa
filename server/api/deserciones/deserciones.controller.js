/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/deserciones              ->  index
 * POST    /api/deserciones              ->  create
 * GET     /api/deserciones/:id          ->  show
 * PUT     /api/deserciones/:id          ->  update
 * DELETE  /api/deserciones/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {Deserciones} from '../../sqldb';

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

// Gets a list of Desercioness
export function index(req, res) {
  return Deserciones.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Deserciones from the DB
export function show(req, res) {
  return Deserciones.find({
    where: {
      idDesercion: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Deserciones in the DB
export function create(req, res) {
  return Deserciones.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Deserciones in the DB
export function update(req, res) {
  if (req.body.idDesercion) {
    delete req.body.idDesercion;
  }
  return Deserciones.find({
    where: {
      idDesercion: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Deserciones from the DB
export function destroy(req, res) {
  return Deserciones.find({
    where: {
      idDesercion: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
