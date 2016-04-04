/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/paises              ->  index
 * POST    /api/paises              ->  create
 * GET     /api/paises/:id          ->  show
 * PUT     /api/paises/:id          ->  update
 * DELETE  /api/paises/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {Paises} from '../../sqldb';

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

// Gets a list of Paisess
export function index(req, res) {
  return Paises.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Paises from the DB
export function show(req, res) {
  return Paises.find({
    where: {
      id_paises: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Paises in the DB
export function create(req, res) {
  return Paises.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Paises in the DB
export function update(req, res) {
  if (req.body.id_paises) {
    delete req.body.id_paises;
  }
  return Paises.find({
    where: {
      id_paises: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Paises from the DB
export function destroy(req, res) {
  return Paises.find({
    where: {
      id_paises: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
