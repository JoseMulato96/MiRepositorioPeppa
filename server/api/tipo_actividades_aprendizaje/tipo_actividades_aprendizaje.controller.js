/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/tipo_actividades_aprendizaje              ->  index
 * POST    /api/tipo_actividades_aprendizaje              ->  create
 * GET     /api/tipo_actividades_aprendizaje/:id          ->  show
 * PUT     /api/tipo_actividades_aprendizaje/:id          ->  update
 * DELETE  /api/tipo_actividades_aprendizaje/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {TipoActividadesAprendizaje} from '../../sqldb';

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

// Gets a list of TipoActividadesAprendizajes
export function index(req, res) {
  return TipoActividadesAprendizaje.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single TipoActividadesAprendizaje from the DB
export function show(req, res) {
  return TipoActividadesAprendizaje.find({
    where: {
      id_tipo_actividad_aprendizaje: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new TipoActividadesAprendizaje in the DB
export function create(req, res) {
  return TipoActividadesAprendizaje.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing TipoActividadesAprendizaje in the DB
export function update(req, res) {
  if (req.body.id_tipo_actividad_aprendizaje) {
    delete req.body.id_tipo_actividad_aprendizaje;
  }
  return TipoActividadesAprendizaje.find({
    where: {
      id_tipo_actividad_aprendizaje: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a TipoActividadesAprendizaje from the DB
export function destroy(req, res) {
  return TipoActividadesAprendizaje.find({
    where: {
      id_tipo_actividad_aprendizaje: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
