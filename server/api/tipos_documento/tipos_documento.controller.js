/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/tipos_documento              ->  index
 * POST    /api/tipos_documento              ->  create
 * GET     /api/tipos_documento/:id          ->  show
 * PUT     /api/tipos_documento/:id          ->  update
 * DELETE  /api/tipos_documento/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {TiposDocumento} from '../../sqldb';

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

// Gets a list of TiposDocumentos
export function index(req, res) {
  return TiposDocumento.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single TiposDocumento from the DB
export function show(req, res) {
  return TiposDocumento.find({
    where: {
      id_tipo_documento: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new TiposDocumento in the DB
export function create(req, res) {
  return TiposDocumento.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing TiposDocumento in the DB
export function update(req, res) {
  if (req.body.id_tipo_documento) {
    delete req.body.id_tipo_documento;
  }
  return TiposDocumento.find({
    where: {
      id_tipo_documento: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a TiposDocumento from the DB
export function destroy(req, res) {
  return TiposDocumento.find({
    where: {
      id_tipo_documento: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
