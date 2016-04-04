/**
 * Paises model events
 */

'use strict';

import {EventEmitter} from 'events';
var Paises = require('../../sqldb').Paises;
var PaisesEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PaisesEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Paises.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    PaisesEvents.emit(event + ':' + doc.id_paises, doc);
    PaisesEvents.emit(event, doc);
    done(null);
  }
}

export default PaisesEvents;
