/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/sabanas_horarios              ->  index
 * POST    /api/sabanas_horarios              ->  create
 * GET     /api/sabanas_horarios/:id          ->  show
 * PUT     /api/sabanas_horarios/:id          ->  update
 * DELETE  /api/sabanas_horarios/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {SabanasHorarios} from '../../sqldb';

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

// Gets a list of SabanasHorarioss
export function index(req, res) {
  return SabanasHorarios.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single SabanasHorarios from the DB
export function show(req, res) {
  return SabanasHorarios.find({
    where: {
      id_sabana_horario: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}
/*Lineas Comentadas ya que no se pide estos metodos para este modelo*
// Creates a new SabanasHorarios in the DB
export function create(req, res) {
  return SabanasHorarios.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing SabanasHorarios in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return SabanasHorarios.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a SabanasHorarios from the DB
export function destroy(req, res) {
  return SabanasHorarios.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
*/
