/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/unidades_medida              ->  index
 * POST    /api/unidades_medida              ->  create
 * GET     /api/unidades_medida/:id          ->  show
 * PUT     /api/unidades_medida/:id          ->  update
 * DELETE  /api/unidades_medida/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {UnidadesMedida} from '../../sqldb';

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

// Gets a list of UnidadesMedidas
export function index(req, res) {
  return UnidadesMedida.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single UnidadesMedida from the DB
export function show(req, res) {
  return UnidadesMedida.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new UnidadesMedida in the DB
export function create(req, res) {
  return UnidadesMedida.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing UnidadesMedida in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return UnidadesMedida.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a UnidadesMedida from the DB
export function destroy(req, res) {
  return UnidadesMedida.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
