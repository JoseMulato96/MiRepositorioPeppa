/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/tipos_sangre              ->  index
 * POST    /api/tipos_sangre              ->  create
 * GET     /api/tipos_sangre/:id          ->  show
 * PUT     /api/tipos_sangre/:id          ->  update
 * DELETE  /api/tipos_sangre/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {TiposSangre} from '../../sqldb';

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

// Gets a list of TiposSangres
export function index(req, res) {
  return TiposSangre.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single TiposSangre from the DB
export function show(req, res) {
  return TiposSangre.find({
    where: {
      id_tipo_sangre: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new TiposSangre in the DB
export function create(req, res) {
  return TiposSangre.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing TiposSangre in the DB
export function update(req, res) {
  if (req.body.id_tipo_sangre) {
    delete req.body.id_tipo_sangre;
  }
  return TiposSangre.find({
    where: {
      id_tipo_sangre: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a TiposSangre from the DB
export function destroy(req, res) {
  return TiposSangre.find({
    where: {
      id_tipo_sangre: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
