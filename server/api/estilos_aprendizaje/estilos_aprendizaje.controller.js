/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/activiades_aprendizaje              ->  index
 * POST    /api/activiades_aprendizaje              ->  create
 * GET     /api/activiades_aprendizaje/:id          ->  show
 * PUT     /api/activiades_aprendizaje/:id          ->  update
 * DELETE  /api/activiades_aprendizaje/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {EstilosAprendizaje} from '../../sqldb';

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

// Gets a list of EstilosAprendizajes
export function index(req, res) {
  return EstilosAprendizaje.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single EstilosAprendizaje from the DB
export function show(req, res) {
  return EstilosAprendizaje.find({
    where: {
      idEstiloAprendizaje: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new EstilosAprendizaje in the DB
export function create(req, res) {
  return EstilosAprendizaje.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing EstilosAprendizaje in the DB
export function update(req, res) {
  if (req.body.idEstiloAprendizaje) {
    delete req.body.idEstiloAprendizaje;
  }
  return EstilosAprendizaje.find({
    where: {
      idEstiloAprendizaje: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a EstilosAprendizaje from the DB
export function destroy(req, res) {
  return EstilosAprendizaje.find({
    where: {
      idEstiloAprendizaje: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
