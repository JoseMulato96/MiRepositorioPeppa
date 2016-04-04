/**
 * ConocimientosProceso model events
 */

'use strict';

import {EventEmitter} from 'events';
var ConocimientosProceso = require('../../sqldb').ConocimientosProceso;
var ConocimientosProcesoEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ConocimientosProcesoEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  ConocimientosProceso.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    ConocimientosProcesoEvents.emit(event + ':' + doc._id, doc);
    ConocimientosProcesoEvents.emit(event, doc);
    done(null);
  }
}

export default ConocimientosProcesoEvents;
