/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/resultados_aprendizaje              ->  index
 * POST    /api/resultados_aprendizaje              ->  create
 * GET     /api/resultados_aprendizaje/:id          ->  show
 * PUT     /api/resultados_aprendizaje/:id          ->  update
 * DELETE  /api/resultados_aprendizaje/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {ResultadosAprendizaje} from '../../sqldb';

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

// Gets a list of ResultadosAprendizajes
export function index(req, res) {
  return ResultadosAprendizaje.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single ResultadosAprendizaje from the DB
export function show(req, res) {
  return ResultadosAprendizaje.find({
    where: {
      id_resultado_aprendizaje: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new ResultadosAprendizaje in the DB
export function create(req, res) {
  return ResultadosAprendizaje.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing ResultadosAprendizaje in the DB
export function update(req, res) {
  if (req.body.id_resultado_aprendizaje) {
    delete req.body.id_resultado_aprendizaje;
  }
  return ResultadosAprendizaje.find({
    where: {
      id_resultado_aprendizaje: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a ResultadosAprendizaje from the DB
export function destroy(req, res) {
  return ResultadosAprendizaje.find({
    where: {
      id_resultado_aprendizaje: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
