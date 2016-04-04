/**
 * ModalidadesFormacion model events
 */

'use strict';

import {EventEmitter} from 'events';
var ModalidadesFormacion = require('../../sqldb').ModalidadesFormacion;
var ModalidadesFormacionEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ModalidadesFormacionEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  ModalidadesFormacion.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    ModalidadesFormacionEvents.emit(event + ':' + doc._id, doc);
    ModalidadesFormacionEvents.emit(event, doc);
    done(null);
  }
}

export default ModalidadesFormacionEvents;
