/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/tipos_rubro              ->  index
 * POST    /api/tipos_rubro              ->  create
 * GET     /api/tipos_rubro/:id          ->  show
 * PUT     /api/tipos_rubro/:id          ->  update
 * DELETE  /api/tipos_rubro/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {TiposRubro} from '../../sqldb';

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

// Gets a list of TiposRubros
export function index(req, res) {
  return TiposRubro.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single TiposRubro from the DB
export function show(req, res) {
  return TiposRubro.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new TiposRubro in the DB
export function create(req, res) {
  return TiposRubro.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing TiposRubro in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return TiposRubro.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a TiposRubro from the DB
export function destroy(req, res) {
  return TiposRubro.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
