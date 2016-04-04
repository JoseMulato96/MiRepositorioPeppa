/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/actividades              ->  index
 * POST    /api/actividades              ->  create
 * GET     /api/actividades/:id          ->  show
 * PUT     /api/actividades/:id          ->  update
 * DELETE  /api/actividades/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {Actividades} from '../../sqldb';

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

// Gets a list of Actividadess
export function index(req, res) {
  return Actividades.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Actividades from the DB
export function show(req, res) {
  return Actividades.find({
    where: {
      idActividad: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Actividades in the DB
export function create(req, res) {
  return Actividades.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Actividades in the DB
export function update(req, res) {
  if (req.body.idActividad) {
    delete req.body.idActividad;
  }
  return Actividades.find({
    where: {
      idActividad: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Actividades from the DB
export function destroy(req, res) {
  return Actividades.find({
    where: {
      idActividad: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

//Funciones Adicionales
