/**
 * Departamentos model events
 */

'use strict';

import {EventEmitter} from 'events';
var Departamentos = require('../../sqldb').Departamentos;
var DepartamentosEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
DepartamentosEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Departamentos.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    DepartamentosEvents.emit(event + ':' + doc.id_departamento, doc);
    DepartamentosEvents.emit(event, doc);
    done(null);
  }
}

export default DepartamentosEvents;
