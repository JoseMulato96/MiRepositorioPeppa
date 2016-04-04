/**
 * TiposRecurso model events
 */

'use strict';

import {EventEmitter} from 'events';
var TiposRecurso = require('../../sqldb').TiposRecurso;
var TiposRecursoEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TiposRecursoEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  TiposRecurso.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    TiposRecursoEvents.emit(event + ':' + doc._id, doc);
    TiposRecursoEvents.emit(event, doc);
    done(null);
  }
}

export default TiposRecursoEvents;
