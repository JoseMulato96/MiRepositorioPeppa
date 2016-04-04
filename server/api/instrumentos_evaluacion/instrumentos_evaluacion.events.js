/**
 * InstrumentosEvaluacion model events
 */

'use strict';

import {EventEmitter} from 'events';
var InstrumentosEvaluacion = require('../../sqldb').InstrumentosEvaluacion;
var InstrumentosEvaluacionEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
InstrumentosEvaluacionEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  InstrumentosEvaluacion.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    InstrumentosEvaluacionEvents.emit(event + ':' + doc._id, doc);
    InstrumentosEvaluacionEvents.emit(event, doc);
    done(null);
  }
}

export default InstrumentosEvaluacionEvents;
