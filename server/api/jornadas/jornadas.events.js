/**
 * Jornadas model events
 */

'use strict';

import {EventEmitter} from 'events';
var Jornadas = require('../../sqldb').Jornadas;
var JornadasEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
JornadasEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Jornadas.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    JornadasEvents.emit(event + ':' + doc.id_jornada, doc);
    JornadasEvents.emit(event, doc);
    done(null);
  }
}

export default JornadasEvents;
