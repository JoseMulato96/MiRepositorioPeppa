/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/conocimientos_proceso              ->  index
 * POST    /api/conocimientos_proceso              ->  create
 * GET     /api/conocimientos_proceso/:id          ->  show
 * PUT     /api/conocimientos_proceso/:id          ->  update
 * DELETE  /api/conocimientos_proceso/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {ConocimientosProceso} from '../../sqldb';

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

// Gets a list of ConocimientosProcesos
export function index(req, res) {
  return ConocimientosProceso.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single ConocimientosProceso from the DB
export function show(req, res) {
  return ConocimientosProceso.find({
    where: {
      idConocimientoProceso: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new ConocimientosProceso in the DB
export function create(req, res) {
  return ConocimientosProceso.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing ConocimientosProceso in the DB
export function update(req, res) {
  if (req.body.idConocimientoProceso) {
    delete req.body.idConocimientoProceso;
  }
  return ConocimientosProceso.find({
    where: {
      idConocimientoProceso: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a ConocimientosProceso from the DB
export function destroy(req, res) {
  return ConocimientosProceso.find({
    where: {
      idConocimientoProceso: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

//Agregar Funciones adicionales

