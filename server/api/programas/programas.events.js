/**
 * Programas model events
 */

'use strict';

import {EventEmitter} from 'events';
var Programas = require('../../sqldb').Programas;
var ProgramasEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ProgramasEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Programas.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    ProgramasEvents.emit(event + ':' + doc._id, doc);
    ProgramasEvents.emit(event, doc);
    done(null);
  }
}

export default ProgramasEvents;
