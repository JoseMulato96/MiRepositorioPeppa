/**
 * DetallesSabanasHorarios model events
 */

'use strict';

import {EventEmitter} from 'events';
var DetallesSabanasHorarios = require('../../sqldb').DetallesSabanasHorarios;
var DetallesSabanasHorariosEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
DetallesSabanasHorariosEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  DetallesSabanasHorarios.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    DetallesSabanasHorariosEvents.emit(event + ':' + doc._id, doc);
    DetallesSabanasHorariosEvents.emit(event, doc);
    done(null);
  }
}

export default DetallesSabanasHorariosEvents;
