/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/caracterizaciones              ->  index
 * POST    /api/caracterizaciones              ->  create
 * GET     /api/caracterizaciones/:id          ->  show
 * PUT     /api/caracterizaciones/:id          ->  update
 * DELETE  /api/caracterizaciones/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {Caracterizaciones} from '../../sqldb';

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

// Gets a list of Caracterizacioness
export function index(req, res) {
  return Caracterizaciones.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Caracterizaciones from the DB
export function show(req, res) {
  return Caracterizaciones.find({
    where: {
      idCaracterizacion: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Caracterizaciones in the DB
export function create(req, res) {
  return Caracterizaciones.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Caracterizaciones in the DB
export function update(req, res) {
  if (req.body.id_caracterizacion) {
    delete req.body.idCaracterizacion;
  }
  return Caracterizaciones.find({
    where: {
      idCaracterizacion: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Caracterizaciones from the DB
export function destroy(req, res) {
  return Caracterizaciones.find({
    where: {
      idCaracterizacion: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
