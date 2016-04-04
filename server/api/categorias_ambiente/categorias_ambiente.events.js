/**
 * CategoriasAmbiente model events
 */

'use strict';

import {EventEmitter} from 'events';
var CategoriasAmbiente = require('../../sqldb').CategoriasAmbiente;
var CategoriasAmbienteEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CategoriasAmbienteEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  CategoriasAmbiente.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    CategoriasAmbienteEvents.emit(event + ':' + doc.id_categoria_ambiente, doc);
    CategoriasAmbienteEvents.emit(event, doc);
    done(null);
  }
}

export default CategoriasAmbienteEvents;
