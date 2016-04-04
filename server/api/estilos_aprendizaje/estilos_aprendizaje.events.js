/**
 * EstilosAprendizaje model events
 */

'use strict';

import {EventEmitter} from 'events';
var EstilosAprendizaje = require('../../sqldb').EstilosAprendizaje;
var EstilosAprendizajeEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
EstilosAprendizajeEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  EstilosAprendizaje.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    EstilosAprendizajeEvents.emit(event + ':' + doc.id_estilo_aprendizaje, doc);
    EstilosAprendizajeEvents.emit(event, doc);
    done(null);
  }
}

export default EstilosAprendizajeEvents;
