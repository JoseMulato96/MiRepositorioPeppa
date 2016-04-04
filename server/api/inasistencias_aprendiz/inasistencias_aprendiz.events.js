/**
 * InasistenciasAprendiz model events
 */

'use strict';

import {EventEmitter} from 'events';
var InasistenciasAprendiz = require('../../sqldb').InasistenciasAprendiz;
var InasistenciasAprendizEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
InasistenciasAprendizEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  InasistenciasAprendiz.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    InasistenciasAprendizEvents.emit(event + ':' + doc._id, doc);
    InasistenciasAprendizEvents.emit(event, doc);
    done(null);
  }
}

export default InasistenciasAprendizEvents;
