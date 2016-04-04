/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/criterios_evaluacion              ->  index
 * POST    /api/criterios_evaluacion              ->  create
 * GET     /api/criterios_evaluacion/:id          ->  show
 * PUT     /api/criterios_evaluacion/:id          ->  update
 * DELETE  /api/criterios_evaluacion/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {CriteriosEvaluacion} from '../../sqldb';

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

// Gets a list of CriteriosEvaluacions
export function index(req, res) {
  return CriteriosEvaluacion.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single CriteriosEvaluacion from the DB
export function show(req, res) {
  return CriteriosEvaluacion.find({
    where: {
      idCriteriosEvaluacion: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new CriteriosEvaluacion in the DB
export function create(req, res) {
  return CriteriosEvaluacion.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing CriteriosEvaluacion in the DB
export function update(req, res) {
  if (req.body.idCriteriosEvaluacion) {
    delete req.body.idCriteriosEvaluacion;
  }
  return CriteriosEvaluacion.find({
    where: {
      idCriteriosEvaluacion: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a CriteriosEvaluacion from the DB
export function destroy(req, res) {
  return CriteriosEvaluacion.find({
    where: {
      idCriteriosEvaluacion: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
