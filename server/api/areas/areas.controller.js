/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/areas              ->  index
 * POST    /api/areas              ->  create
 * GET     /api/areas/:id          ->  show
 * PUT     /api/areas/:id          ->  update
 * DELETE  /api/areas/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {Areas} from '../../sqldb';

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

// Gets a list of Areass
export function index(req, res) {
  return Areas.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Areas from the DB
export function show(req, res) {
  return Areas.find({
    where: {
      idArea: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Areas in the DB
export function create(req, res) {
  return Areas.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Areas in the DB
export function update(req, res) {
  if (req.body.idArea) {
    delete req.body.idArea;
  }
  return Areas.find({
    where: {
      idArea: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Areas from the DB
export function destroy(req, res) {
  return Areas.find({
    where: {
      idArea: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
