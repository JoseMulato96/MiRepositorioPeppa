/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/departamentos              ->  index
 * POST    /api/departamentos              ->  create
 * GET     /api/departamentos/:id          ->  show
 * PUT     /api/departamentos/:id          ->  update
 * DELETE  /api/departamentos/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {Departamentos} from '../../sqldb';

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

// Gets a list of Departamentoss
export function index(req, res) {
  return Departamentos.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Departamentos from the DB
export function show(req, res) {
  return Departamentos.find({
    where: {
      idDepartamento: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Departamentos in the DB
export function create(req, res) {
  return Departamentos.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Departamentos in the DB
export function update(req, res) {
  if (req.body.idDepartamento) {
    delete req.body.idDepartamento;
  }
  return Departamentos.find({
    where: {
      idDepartamento: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Departamentos from the DB
export function destroy(req, res) {
  return Departamentos.find({
    where: {
      idDepartamento: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
