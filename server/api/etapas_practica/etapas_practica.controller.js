/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/etapas_practica              ->  index
 * POST    /api/etapas_practica              ->  create
 * GET     /api/etapas_practica/:id          ->  show
 * PUT     /api/etapas_practica/:id          ->  update
 * DELETE  /api/etapas_practica/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {EtapasPractica} from '../../sqldb';

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

// Gets a list of EtapasPracticas
export function index(req, res) {
  return EtapasPractica.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single EtapasPractica from the DB
export function show(req, res) {
  return EtapasPractica.find({
    where: {
      idEtapaPractica: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new EtapasPractica in the DB
export function create(req, res) {
  return EtapasPractica.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing EtapasPractica in the DB
export function update(req, res) {
  if (req.body.idEtapaPractica) {
    delete req.body.idEtapaPractica;
  }
  return EtapasPractica.find({
    where: {
      idEtapaPractica: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a EtapasPractica from the DB
export function destroy(req, res) {
  return EtapasPractica.find({
    where: {
      idEtapaPractica: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
