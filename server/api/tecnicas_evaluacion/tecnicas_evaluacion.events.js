/**
 * TecnicasEvaluacion model events
 */

'use strict';

import {EventEmitter} from 'events';
var TecnicasEvaluacion = require('../../sqldb').TecnicasEvaluacion;
var TecnicasEvaluacionEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TecnicasEvaluacionEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  TecnicasEvaluacion.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    TecnicasEvaluacionEvents.emit(event + ':' + doc._id, doc);
    TecnicasEvaluacionEvents.emit(event, doc);
    done(null);
  }
}

export default TecnicasEvaluacionEvents;
