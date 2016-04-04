/**
 * NovedadesInstructor model events
 */

'use strict';

import {EventEmitter} from 'events';
var NovedadesInstructor = require('../../sqldb').NovedadesInstructor;
var NovedadesInstructorEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
NovedadesInstructorEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  NovedadesInstructor.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    NovedadesInstructorEvents.emit(event + ':' + doc.id_novedad_instructor, doc);
    NovedadesInstructorEvents.emit(event, doc);
    done(null);
  }
}

export default NovedadesInstructorEvents;
