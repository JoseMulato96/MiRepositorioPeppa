/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/ciudades              ->  index
 * POST    /api/ciudades              ->  create
 * GET     /api/ciudades/:id          ->  show
 * PUT     /api/ciudades/:id          ->  update
 * DELETE  /api/ciudades/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {Ciudades} from '../../sqldb';

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

// Gets a list of Ciudadess
export function index(req, res) {
  return Ciudades.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Ciudades from the DB
export function show(req, res) {
  return Ciudades.find({
    where: {
      idCiudad: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Ciudades in the DB
export function create(req, res) {
  return Ciudades.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Ciudades in the DB
export function update(req, res) {
  if (req.body.idCiudad) {
    delete req.body.idCiudad;
  }
  return Ciudades.find({
    where: {
      idCiudad: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Ciudades from the DB
export function destroy(req, res) {
  return Ciudades.find({
    where: {
      idCiudad: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
