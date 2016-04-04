/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/redes_tecnologicas              ->  index
 * POST    /api/redes_tecnologicas              ->  create
 * GET     /api/redes_tecnologicas/:id          ->  show
 * PUT     /api/redes_tecnologicas/:id          ->  update
 * DELETE  /api/redes_tecnologicas/:id          ->  destroy  No esta hábilitado
 */

'use strict';

import _ from 'lodash';
import {RedesTecnologicas} from '../../sqldb';

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

// Gets a list of RedesTecnologicass
export function index(req, res) {
  return RedesTecnologicas.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single RedesTecnologicas from the DB
export function show(req, res) {
  return RedesTecnologicas.find({
    where: {
      idRedTecnologica: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new RedesTecnologicas in the DB
export function create(req, res) {
  return RedesTecnologicas.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing RedesTecnologicas in the DB
export function update(req, res) {
  if (req.body.idRedTecnologica) {
    delete req.body.idRedTecnologica;
  }
  return RedesTecnologicas.find({
    where: {
      idRedTecnologica: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}
/*
// Deletes a RedesTecnologicas from the DB
export function destroy(req, res) {
  return RedesTecnologicas.find({
    where: {
      idRedTecnologica: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
*/
//Agregar funciones Adicionales 
