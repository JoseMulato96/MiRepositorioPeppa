/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/actividades_aprendizaje              ->  index
 * POST    /api/actividades_aprendizaje              ->  create
 * GET     /api/actividades_aprendizaje/:id          ->  show
 * PUT     /api/actividades_aprendizaje/:id          ->  update
 * DELETE  /api/actividades_aprendizaje/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {ActividadesAprendizaje} from '../../sqldb';

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

// Gets a list of ActividadesAprendizajes
export function index(req, res) {
  return ActividadesAprendizaje.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single ActividadesAprendizaje from the DB
export function show(req, res) {
  return ActividadesAprendizaje.find({
    where: {
      idActividadAprendizaje: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new ActividadesAprendizaje in the DB
export function create(req, res) {
  return ActividadesAprendizaje.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing ActividadesAprendizaje in the DB
export function update(req, res) {
  if (req.body.idActividadAprendizaje) {
    delete req.body.idActividadAprendizaje;
  }
  return ActividadesAprendizaje.find({
    where: {
      idActividadAprendizaje: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a ActividadesAprendizaje from the DB
export function destroy(req, res) {
  return ActividadesAprendizaje.find({
    where: {
      idActividadAprendizaje: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
