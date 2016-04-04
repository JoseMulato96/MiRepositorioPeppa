/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/ambientes_formacion              ->  index
 * POST    /api/ambientes_formacion              ->  create
 * GET     /api/ambientes_formacion/:id          ->  show
 * PUT     /api/ambientes_formacion/:id          ->  update
 * DELETE  /api/ambientes_formacion/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {AmbientesFormacion} from '../../sqldb';

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

// Gets a list of AmbientesFormacions
export function index(req, res) {
  return AmbientesFormacion.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single AmbientesFormacion from the DB
export function show(req, res) {
  return AmbientesFormacion.find({
    where: {
      id_ambiente_formacion: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new AmbientesFormacion in the DB
export function create(req, res) {
  return AmbientesFormacion.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing AmbientesFormacion in the DB
export function update(req, res) {
  if (req.body.id_ambiente_formacion) {
    delete req.body.id_ambiente_formacion;
  }
  return AmbientesFormacion.find({
    where: {
      id_ambiente_formacion: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a AmbientesFormacion from the DB
export function destroy(req, res) {
  return AmbientesFormacion.find({
    where: {
      id_ambiente_formacion: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
