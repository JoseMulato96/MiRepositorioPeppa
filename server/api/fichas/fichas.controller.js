/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/ficha              ->  index
 * POST    /api/ficha              ->  create
 * GET     /api/ficha/:id          ->  show
 * PUT     /api/ficha/:id          ->  update
 * DELETE  /api/ficha/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {Fichas} from '../../sqldb';

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

// Gets a list of Fichass
export function index(req, res) {
  return Fichas.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Fichas from the DB
export function show(req, res) {
  return Fichas.find({
    where: {
      idFicha: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Fichas in the DB
export function create(req, res) {
  return Fichas.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Fichas in the DB
export function update(req, res) {
  if (req.body.idFicha) {
    delete req.body.idFicha;
  }
  return Fichas.find({
    where: {
      idFicha: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Fichas from the DB
export function destroy(req, res) {
  return Fichas.find({
    where: {
      idFicha: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
