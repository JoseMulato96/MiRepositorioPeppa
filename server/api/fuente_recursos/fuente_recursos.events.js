/**
 * FuenteRecursos model events
 */

'use strict';

import {EventEmitter} from 'events';
var FuenteRecursos = require('../../sqldb').FuenteRecursos;
var FuenteRecursosEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
FuenteRecursosEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  FuenteRecursos.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    FuenteRecursosEvents.emit(event + ':' + doc._id, doc);
    FuenteRecursosEvents.emit(event, doc);
    done(null);
  }
}

export default FuenteRecursosEvents;
