/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/competencias              ->  index
 * POST    /api/competencias              ->  create
 * GET     /api/competencias/:id          ->  show
 * PUT     /api/competencias/:id          ->  update
 * DELETE  /api/competencias/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {Competencias} from '../../sqldb';

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

// Gets a list of Competenciass
export function index(req, res) {
  return Competencias.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Competencias from the DB
export function show(req, res) {
  return Competencias.find({
    where: {
    idCompetencia: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Competencias in the DB
export function create(req, res) {
  return Competencias.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Competencias in the DB
export function update(req, res) {
  if (req.body.idCompetencia) {
    delete req.body.idCompetencia;
  }
  return Competencias.find({
    where: {
      idCompetencia: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Competencias from the DB
export function destroy(req, res) {
  return Competencias.find({
    where: {
      idCompetencia: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
