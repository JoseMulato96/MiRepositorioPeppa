/**
 * Caracterizaciones model events
 */

'use strict';

import {EventEmitter} from 'events';
var Caracterizaciones = require('../../sqldb').Caracterizaciones;
var CaracterizacionesEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CaracterizacionesEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Caracterizaciones.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    CaracterizacionesEvents.emit(event + ':' + doc.id_caracterizacion, doc);
    CaracterizacionesEvents.emit(event, doc);
    done(null);
  }
}

export default CaracterizacionesEvents;
