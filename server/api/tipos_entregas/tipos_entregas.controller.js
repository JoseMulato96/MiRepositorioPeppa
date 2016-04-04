/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/tipos_entregas              ->  index
 * POST    /api/tipos_entregas              ->  create
 * GET     /api/tipos_entregas/:id          ->  show
 * PUT     /api/tipos_entregas/:id          ->  update
 * DELETE  /api/tipos_entregas/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {TiposEntregas} from '../../sqldb';

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

// Gets a list of TiposEntregass
export function index(req, res) {
  return TiposEntregas.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single TiposEntregas from the DB
export function show(req, res) {
  return TiposEntregas.find({
    where: {
      id_tipo_entrega: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new TiposEntregas in the DB
export function create(req, res) {
  return TiposEntregas.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing TiposEntregas in the DB
export function update(req, res) {
  if (req.body.id_tipo_entrega) {
    delete req.body.id_tipo_entrega;
  }
  return TiposEntregas.find({
    where: {
      id_tipo_entrega: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a TiposEntregas from the DB
export function destroy(req, res) {
  return TiposEntregas.find({
    where: {
      id_tipo_entrega: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
