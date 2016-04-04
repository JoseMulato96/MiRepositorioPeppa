/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/tipos_vocero              ->  index
 * POST    /api/tipos_vocero              ->  create
 * GET     /api/tipos_vocero/:id          ->  show
 * PUT     /api/tipos_vocero/:id          ->  update
 * DELETE  /api/tipos_vocero/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {TiposVocero} from '../../sqldb';

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

// Gets a list of TiposVoceros
export function index(req, res) {
  return TiposVocero.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single TiposVocero from the DB
export function show(req, res) {
  return TiposVocero.find({
    where: {
      id_tipo_vocero: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new TiposVocero in the DB
export function create(req, res) {
  return TiposVocero.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing TiposVocero in the DB
export function update(req, res) {
  if (req.body.id_tipo_vocero) {
    delete req.body.id_tipo_vocero;
  }
  return TiposVocero.find({
    where: {
      id_tipo_vocero: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a TiposVocero from the DB
export function destroy(req, res) {
  return TiposVocero.find({
    where: {
      id_tipo_vocero: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
