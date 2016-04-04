/**
 * CriteriosEvaluacion model events
 */

'use strict';

import {EventEmitter} from 'events';
var CriteriosEvaluacion = require('../../sqldb').CriteriosEvaluacion;
var CriteriosEvaluacionEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CriteriosEvaluacionEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  CriteriosEvaluacion.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    CriteriosEvaluacionEvents.emit(event + ':' + doc._id, doc);
    CriteriosEvaluacionEvents.emit(event, doc);
    done(null);
  }
}

export default CriteriosEvaluacionEvents;
