/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/tipos_formacion              ->  index
 * POST    /api/tipos_formacion              ->  create
 * GET     /api/tipos_formacion/:id          ->  show
 * PUT     /api/tipos_formacion/:id          ->  update
 * DELETE  /api/tipos_formacion/:id          ->  destroy //No se encuentra hábilitado
 */

'use strict';

import _ from 'lodash';
import {TiposFormacion} from '../../sqldb';

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

// Gets a list of TiposFormacions
export function index(req, res) {
  return TiposFormacion.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single TiposFormacion from the DB
export function show(req, res) {
  return TiposFormacion.find({
    where: {
     idTipoFormacion: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new TiposFormacion in the DB
export function create(req, res) {
  return TiposFormacion.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing TiposFormacion in the DB
export function update(req, res) {
  if (req.body.idTipoFormacion) {
    delete req.body.idTipoFormacion;
  }
  return TiposFormacion.find({
    where: {
      idTipoFormacion: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/*
// Deletes a TiposFormacion from the DB
export function destroy(req, res) {
  return TiposFormacion.find({
    where: {
      idTipoFormacion: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
*/

//Por favor agregar debajo de este comentario las funciones adicionales al CRUD.
