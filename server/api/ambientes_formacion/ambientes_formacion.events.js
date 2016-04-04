/**
 * AmbientesFormacion model events
 */

'use strict';

import {EventEmitter} from 'events';
var AmbientesFormacion = require('../../sqldb').AmbientesFormacion;
var AmbientesFormacionEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
AmbientesFormacionEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  AmbientesFormacion.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    AmbientesFormacionEvents.emit(event + ':' + doc.id_ambiente_formacion, doc);
    AmbientesFormacionEvents.emit(event, doc);
    done(null);
  }
}

export default AmbientesFormacionEvents;
