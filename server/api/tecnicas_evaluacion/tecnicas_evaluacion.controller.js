/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/tecnicas_evaluacion              ->  index
 * POST    /api/tecnicas_evaluacion              ->  create
 * GET     /api/tecnicas_evaluacion/:id          ->  show
 * PUT     /api/tecnicas_evaluacion/:id          ->  update
 * DELETE  /api/tecnicas_evaluacion/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {TecnicasEvaluacion} from '../../sqldb';

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

// Gets a list of TecnicasEvaluacions
export function index(req, res) {
  //return TecnicasEvaluacion.findAll()
  return TecnicasEvaluacion.findAll({
    attributes:[
    'id_tecnica_evaluacion',
    'tecnica_evaluacion'
    ]
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single TecnicasEvaluacion from the DB
export function show(req, res) {
  return TecnicasEvaluacion.find({
    where: {
      id_tecnica_evaluacion: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new TecnicasEvaluacion in the DB
export function create(req, res) {
  return TecnicasEvaluacion.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing TecnicasEvaluacion in the DB
export function update(req, res) {
  if (req.body.id_tecnica_evaluacion) {
    delete req.body.id_tecnica_evaluacion;
  }
  return TecnicasEvaluacion.find({
    where: {
      id_tecnica_evaluacion: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a TecnicasEvaluacion from the DB
export function destroy(req, res) {
  return TecnicasEvaluacion.find({
    where: {
      id_tecnica_evaluacion: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
