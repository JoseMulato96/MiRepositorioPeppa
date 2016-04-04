/**
 * Proyectos model events
 */

'use strict';

import {EventEmitter} from 'events';
var Proyectos = require('../../sqldb').Proyectos;
var ProyectosEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ProyectosEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Proyectos.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    ProyectosEvents.emit(event + ':' + doc._id, doc);
    ProyectosEvents.emit(event, doc);
    done(null);
  }
}

export default ProyectosEvents;
