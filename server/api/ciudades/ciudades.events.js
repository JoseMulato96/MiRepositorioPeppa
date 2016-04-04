/**
 * Ciudades model events
 */

'use strict';

import {EventEmitter} from 'events';
var Ciudades = require('../../sqldb').Ciudades;
var CiudadesEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CiudadesEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Ciudades.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    CiudadesEvents.emit(event + ':' + doc.id_ciudad, doc);
    CiudadesEvents.emit(event, doc);
    done(null);
  }
}

export default CiudadesEvents;
