/**
 * ResultadosAprendizaje model events
 */

'use strict';

import {EventEmitter} from 'events';
var ResultadosAprendizaje = require('../../sqldb').ResultadosAprendizaje;
var ResultadosAprendizajeEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ResultadosAprendizajeEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  ResultadosAprendizaje.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    ResultadosAprendizajeEvents.emit(event + ':' + doc._id, doc);
    ResultadosAprendizajeEvents.emit(event, doc);
    done(null);
  }
}

export default ResultadosAprendizajeEvents;
