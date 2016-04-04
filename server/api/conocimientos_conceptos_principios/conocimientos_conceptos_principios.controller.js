/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/conocimientos_conceptos_principios              ->  index
 * POST    /api/conocimientos_conceptos_principios              ->  create
 * GET     /api/conocimientos_conceptos_principios/:id          ->  show
 * PUT     /api/conocimientos_conceptos_principios/:id          ->  update
 * DELETE  /api/conocimientos_conceptos_principios/:id          ->  destroy //No se encuentra hábilitado
 */

'use strict';

import _ from 'lodash';
import {ConocimientosConceptosPrincipios} from '../../sqldb';

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

// Gets a list of ConocimientosConceptosPrincipioss
export function index(req, res) {
  return ConocimientosConceptosPrincipios.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single ConocimientosConceptosPrincipios from the DB
export function show(req, res) {
  return ConocimientosConceptosPrincipios.find({
    where: {
      idConocimientoConceptoPrincipios: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new ConocimientosConceptosPrincipios in the DB
export function create(req, res) {
  return ConocimientosConceptosPrincipios.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing ConocimientosConceptosPrincipios in the DB
export function update(req, res) {
  if (req.body.idConocimientoConceptoPrincipios) {
    delete req.body.idConocimientoConceptoPrincipios;
  }
  return ConocimientosConceptosPrincipios.find({
    where: {
      idConocimientoConceptoPrincipios: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/*
// Deletes a ConocimientosConceptosPrincipios from the DB
export function destroy(req, res) {
  return ConocimientosConceptosPrincipios.find({
    where: {
      idConocimientoConceptoPrincipios: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
*/
//Por favor agregar debajo de este comentario las funciones adicionales al CRUD.
