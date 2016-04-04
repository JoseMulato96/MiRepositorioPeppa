/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/tipos_oferta              ->  index
 * POST    /api/tipos_oferta              ->  create
 * GET     /api/tipos_oferta/:id          ->  show
 * PUT     /api/tipos_oferta/:id          ->  update
 * DELETE  /api/tipos_oferta/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {TiposOferta} from '../../sqldb';

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

// Gets a list of TiposOfertas
export function index(req, res) {
  return TiposOferta.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single TiposOferta from the DB
export function show(req, res) {
  return TiposOferta.find({
    where: {
      id_tipo_oferta: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new TiposOferta in the DB
export function create(req, res) {
  return TiposOferta.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing TiposOferta in the DB
export function update(req, res) {
  if (req.body.id_tipo_oferta) {
    delete req.body.id_tipo_oferta;
  }
  return TiposOferta.find({
    where: {
      id_tipo_oferta: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a TiposOferta from the DB
export function destroy(req, res) {
  return TiposOferta.find({
    where: {
      id_tipo_oferta: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
