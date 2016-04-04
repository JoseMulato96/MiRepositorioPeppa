/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/guias_aprendizaje              ->  index
 * POST    /api/guias_aprendizaje              ->  create
 * GET     /api/guias_aprendizaje/:id          ->  show
 * PUT     /api/guias_aprendizaje/:id          ->  update
 * DELETE  /api/guias_aprendizaje/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {GuiasAprendizaje} from '../../sqldb';

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

// Gets a list of GuiasAprendizajes
export function index(req, res) {
  return GuiasAprendizaje.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single GuiasAprendizaje from the DB
export function show(req, res) {
  return GuiasAprendizaje.find({
    where: {
      id_guia_aprendizaje: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new GuiasAprendizaje in the DB
export function create(req, res) {
  return GuiasAprendizaje.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing GuiasAprendizaje in the DB
export function update(req, res) {
  if (req.body.id_guia_aprendizaje) {
    delete req.body.id_guia_aprendizaje;
  }
  return GuiasAprendizaje.find({
    where: {
      id_guia_aprendizaje: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a GuiasAprendizaje from the DB
export function destroy(req, res) {
  return GuiasAprendizaje.find({
    where: {
      id_guia_aprendizaje: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
