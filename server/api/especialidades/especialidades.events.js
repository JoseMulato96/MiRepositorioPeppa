/**
 * Especialidades model events
 */

'use strict';

import {EventEmitter} from 'events';
var Especialidades = require('../../sqldb').Especialidades;
var EspecialidadesEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
EspecialidadesEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Especialidades.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    EspecialidadesEvents.emit(event + ':' + doc.id_especialidad, doc);
    EspecialidadesEvents.emit(event, doc);
    done(null);
  }
}

export default EspecialidadesEvents;
