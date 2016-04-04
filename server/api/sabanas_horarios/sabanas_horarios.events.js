/**
 * SabanasHorarios model events
 */

'use strict';

import {EventEmitter} from 'events';
var SabanasHorarios = require('../../sqldb').SabanasHorarios;
var SabanasHorariosEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SabanasHorariosEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  SabanasHorarios.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    SabanasHorariosEvents.emit(event + ':' + doc._id, doc);
    SabanasHorariosEvents.emit(event, doc);
    done(null);
  }
}

export default SabanasHorariosEvents;
