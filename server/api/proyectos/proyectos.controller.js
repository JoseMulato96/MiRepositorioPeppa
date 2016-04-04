/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/proyectos              ->  index
 * POST    /api/proyectos              ->  create
 * GET     /api/proyectos/:id          ->  show
 * PUT     /api/proyectos/:id          ->  update
 * DELETE  /api/proyectos/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {Proyectos} from '../../sqldb';

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

// Gets a list of Proyectoss
export function index(req, res) {
  return Proyectos.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Proyectos from the DB
export function show(req, res) {
  return Proyectos.find({
    where: {
      idProyecto: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Proyectos in the DB
export function create(req, res) {
  return Proyectos.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Proyectos in the DB
export function update(req, res) {
  if (req.body.idProyecto) {
    delete req.body.idProyecto;
  }
  return Proyectos.find({
    where: {
      idProyecto: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Proyectos from the DB
export function destroy(req, res) {
  return Proyectos.find({
    where: {
      idProyecto: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}