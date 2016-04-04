/**
 * TiposAmbiente model events
 */

'use strict';

import {EventEmitter} from 'events';
var TiposAmbiente = require('../../sqldb').TiposAmbiente;
var TiposAmbienteEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TiposAmbienteEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  TiposAmbiente.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    TiposAmbienteEvents.emit(event + ':' + doc.id_tipo_ambiente, doc);
    TiposAmbienteEvents.emit(event, doc);
    done(null);
  }
}

export default TiposAmbienteEvents;
