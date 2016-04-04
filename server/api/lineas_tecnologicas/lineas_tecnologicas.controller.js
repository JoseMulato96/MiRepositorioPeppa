/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/lineas_tecnologicas              ->  index
 * POST    /api/lineas_tecnologicas              ->  create
 * GET     /api/lineas_tecnologicas/:id          ->  show
 * PUT     /api/lineas_tecnologicas/:id          ->  update
 * DELETE  /api/lineas_tecnologicas/:id          ->  destroy   -> No hábilitado
 */

'use strict';

import _ from 'lodash';
import {LineasTecnologicas} from '../../sqldb';

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

// Gets a list of LineasTecnologicass
export function index(req, res) {
  return LineasTecnologicas.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single LineasTecnologicas from the DB
export function show(req, res) {
  return LineasTecnologicas.find({
    where: {
      idLineaTecnologica: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new LineasTecnologicas in the DB
export function create(req, res) {
  return LineasTecnologicas.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing LineasTecnologicas in the DB
export function update(req, res) {
  if (req.body.idLineaTecnologica) {
    delete req.body.idLineaTecnologica;
  }
  return LineasTecnologicas.find({
    where: {
      idLineaTecnologica: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/*
// Deletes a LineasTecnologicas from the DB
export function destroy(req, res) {
  return LineasTecnologicas.find({
    where: {
      idLineaTecnologica: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
*/
//Agregar funciones adicionales