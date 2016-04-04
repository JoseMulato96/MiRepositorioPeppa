/**
 * TiposInstructor model events
 */

'use strict';

import {EventEmitter} from 'events';
var TiposInstructor = require('../../sqldb').TiposInstructor;
var TiposInstructorEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TiposInstructorEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  TiposInstructor.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    TiposInstructorEvents.emit(event + ':' + doc.id_tipo_instructor, doc);
    TiposInstructorEvents.emit(event, doc);
    done(null);
  }
}

export default TiposInstructorEvents;
