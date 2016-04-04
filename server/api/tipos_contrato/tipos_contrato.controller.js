/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/tipos_contrato              ->  index
 * POST    /api/tipos_contrato              ->  create
 * GET     /api/tipos_contrato/:id          ->  show
 * PUT     /api/tipos_contrato/:id          ->  update
 * DELETE  /api/tipos_contrato/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {TiposContrato} from '../../sqldb';

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

// Gets a list of TiposContratos
export function index(req, res) {
  return TiposContrato.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single TiposContrato from the DB
export function show(req, res) {
  return TiposContrato.find({
    where: {
      id_tipo_contrato: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new TiposContrato in the DB
export function create(req, res) {
  return TiposContrato.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing TiposContrato in the DB
export function update(req, res) {
  if (req.body.id_tipo_contrato) {
    delete req.body.id_tipo_contrato;
  }
  return TiposContrato.find({
    where: {
      id_tipo_contrato: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a TiposContrato from the DB
export function destroy(req, res) {
  return TiposContrato.find({
    where: {
      id_tipo_contrato: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
