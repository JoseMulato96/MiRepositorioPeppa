/**
 * Broadcast updates to client when the model changes
 */

'use strict';

import AmbientesFormacionEvents from './ambientes_formacion.events';

// Model events to emit
var events = ['save', 'remove'];

export function register(socket) {
  // Bind model events to socket events
  for (var i = 0, eventsLength = events.length; i < eventsLength; i++) {
    var event = events[i];
    var listener = createListener('ambientesFormacion:' + event, socket);

    AmbientesFormacionEvents.on(event, listener);
    socket.on('disconnect', removeListener(event, listener));
  }
}


function createListener(event, socket) {
  return function(doc) {
    socket.emit(event, doc);
  };
}

function removeListener(event, listener) {
  return function() {
    AmbientesFormacionEvents.removeListener(event, listener);
  };
}
