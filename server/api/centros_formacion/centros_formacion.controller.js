/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/centros_formacion              ->  index
 * POST    /api/centros_formacion              ->  create
 * GET     /api/centros_formacion/:id          ->  show
 * PUT     /api/centros_formacion/:id          ->  update
 * DELETE  /api/centros_formacion/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {CentrosFormacion} from '../../sqldb';

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

// Gets a list of CentrosFormacions
export function index(req, res) {
  return CentrosFormacion.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single CentrosFormacion from the DB
export function show(req, res) {
  return CentrosFormacion.find({
    where: {
      id_centro_formacion: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new CentrosFormacion in the DB
export function create(req, res) {
  return CentrosFormacion.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing CentrosFormacion in the DB
export function update(req, res) {
  if (req.body.id_centro_formacion) {
    delete req.body.id_centro_formacion;
  }
  return CentrosFormacion.find({
    where: {
      id_centro_formacion: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a CentrosFormacion from the DB
export function destroy(req, res) {
  return CentrosFormacion.find({
    where: {
      id_centro_formacion: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
