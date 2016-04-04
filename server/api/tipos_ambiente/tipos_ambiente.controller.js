/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/tipos_ambiente              ->  index
 * POST    /api/tipos_ambiente              ->  create
 * GET     /api/tipos_ambiente/:id          ->  show
 * PUT     /api/tipos_ambiente/:id          ->  update
 * DELETE  /api/tipos_ambiente/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {TiposAmbiente} from '../../sqldb';

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

// Gets a list of TiposAmbientes
export function index(req, res) {
  return TiposAmbiente.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single TiposAmbiente from the DB
export function show(req, res) {
  return TiposAmbiente.find({
    where: {
      id_tipo_ambiente: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new TiposAmbiente in the DB
export function create(req, res) {
  return TiposAmbiente.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing TiposAmbiente in the DB
export function update(req, res) {
  if (req.body.id_tipo_ambiente) {
    delete req.body.id_tipo_ambiente;
  }
  return TiposAmbiente.find({
    where: {
      id_tipo_ambiente: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a TiposAmbiente from the DB
export function destroy(req, res) {
  return TiposAmbiente.find({
    where: {
      id_tipo_ambiente: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
