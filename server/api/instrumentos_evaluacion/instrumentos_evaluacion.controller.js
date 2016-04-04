/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/instrumentos_evaluacion              ->  index
 * POST    /api/instrumentos_evaluacion              ->  create
 * GET     /api/instrumentos_evaluacion/:id          ->  show
 * PUT     /api/instrumentos_evaluacion/:id          ->  update
 * DELETE  /api/instrumentos_evaluacion/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {InstrumentosEvaluacion} from '../../sqldb';

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

// Gets a list of InstrumentosEvaluacions
export function index(req, res) {
  return InstrumentosEvaluacion.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single InstrumentosEvaluacion from the DB
export function show(req, res) {
  return InstrumentosEvaluacion.find({
    where: {
      id_instrumento_evaluacion: req.params.id_instrumento_evaluacion
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new InstrumentosEvaluacion in the DB
export function create(req, res) {
  return InstrumentosEvaluacion.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing InstrumentosEvaluacion in the DB
export function update(req, res) {
  if (req.body.id_instrumento_evaluacion) {
    delete req.body.id_instrumento_evaluacion;
  }
  return InstrumentosEvaluacion.find({
    where: {
      id_instrumento_evaluacion: req.params.id_instrumento_evaluacion
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a InstrumentosEvaluacion from the DB
export function destroy(req, res) {
  return InstrumentosEvaluacion.find({
    where: {
      id_instrumento_evaluacion: req.params.id_instrumento_evaluacion
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
