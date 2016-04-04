/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/tipos_competencia              ->  index
 * POST    /api/tipos_competencia              ->  create
 * GET     /api/tipos_competencia/:id          ->  show
 * PUT     /api/tipos_competencia/:id          ->  update
 * DELETE  /api/tipos_competencia/:id          ->  destroy -> No Disponible
 */

'use strict';

import _ from 'lodash';
import {TiposCompetencia} from '../../sqldb';

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

// Gets a list of TiposCompetencias
export function index(req, res) {
  return TiposCompetencia.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single TiposCompetencia from the DB
export function show(req, res) {
  return TiposCompetencia.find({
    where: {
      idTipoCompetencia: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new TiposCompetencia in the DB
export function create(req, res) {
  return TiposCompetencia.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing TiposCompetencia in the DB
export function update(req, res) {
  if (req.body.idTipoCompetencia) {
    delete req.body.idTipoCompetencia;
  }
  return TiposCompetencia.find({
    where: {
      idTipoCompetencia: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/*
// Deletes a TiposCompetencia from the DB
export function destroy(req, res) {
  return TiposCompetencia.find({
    where: {
      idTipoCompetencia: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
*/

//Agregar funciones adicionales
