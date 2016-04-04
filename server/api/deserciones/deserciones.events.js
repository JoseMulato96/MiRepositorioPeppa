/**
 * Deserciones model events
 */

'use strict';

import {EventEmitter} from 'events';
var Deserciones = require('../../sqldb').Deserciones;
var DesercionesEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
DesercionesEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Deserciones.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    DesercionesEvents.emit(event + ':' + doc.id_desercion, doc);
    DesercionesEvents.emit(event, doc);
    done(null);
  }
}

export default DesercionesEvents;
