/**
 * Usuarios model events
 */

'use strict';

import {EventEmitter} from 'events';
var Usuarios = require('../../sqldb').Usuarios;
var UsuariosEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
UsuariosEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Usuarios.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    UsuariosEvents.emit(event + ':' + doc.id_usuario, doc);
    UsuariosEvents.emit(event, doc);
    done(null);
  }
}

export default UsuariosEvents;
