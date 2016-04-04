/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/programas              ->  index
 * POST    /api/programas              ->  create
 * GET     /api/programas/:id          ->  show
 * PUT     /api/programas/:id          ->  update
 * DELETE  /api/programas/:id          ->  destroy -> No Disponible
 */

'use strict';

import _ from 'lodash';
import {Programas} from '../../sqldb';

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

// Gets a list of Programass
export function index(req, res) {
  return Programas.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Programas from the DB
export function show(req, res) {
  return Programas.find({
    where: {
      codigo: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Programas in the DB
export function create(req, res) {
  return Programas.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Programas in the DB
export function update(req, res) {
  if (req.body.codigo) {
    delete req.body.codigo;
  }
  return Programas.find({
    where: {
      codigo: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/*
// Deletes a Programas from the DB
export function destroy(req, res) {
  return Programas.find({
    where: {
      codigo: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
*/
//Funciones Adicionales 
