/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/modalidades_formacion              ->  index
 * POST    /api/modalidades_formacion              ->  create
 * GET     /api/modalidades_formacion/:id          ->  show
 * PUT     /api/modalidades_formacion/:id          ->  update
 * DELETE  /api/modalidades_formacion/:id          ->  destroy  -> No hábilitado
 */

'use strict';

import _ from 'lodash';
import {ModalidadesFormacion} from '../../sqldb';

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

// Gets a list of ModalidadesFormacions
export function index(req, res) {
  return ModalidadesFormacion.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single ModalidadesFormacion from the DB
export function show(req, res) {
  return ModalidadesFormacion.find({
    where: {
      idModalidadFormacion: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new ModalidadesFormacion in the DB
export function create(req, res) {
  return ModalidadesFormacion.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing ModalidadesFormacion in the DB
export function update(req, res) {
  if (req.body.idModalidadFormacion) {
    delete req.body.idModalidadFormacion;
  }
  return ModalidadesFormacion.find({
    where: {
      idModalidadFormacion: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}
/*
// Deletes a ModalidadesFormacion from the DB
export function destroy(req, res) {
  return ModalidadesFormacion.find({
    where: {
      idModalidadFormacion: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
*/
//Agregar las funciones adicionales