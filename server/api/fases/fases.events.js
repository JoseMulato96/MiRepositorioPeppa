/**
 * Fases model events
 */

'use strict';

import {EventEmitter} from 'events';
var Fases = require('../../sqldb').Fases;
var FasesEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
FasesEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Fases.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    FasesEvents.emit(event + ':' + doc._id, doc);
    FasesEvents.emit(event, doc);
    done(null);
  }
}

export default FasesEvents;
