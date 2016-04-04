/**
 * TipoActividadesAprendizaje model events
 */

'use strict';

import {EventEmitter} from 'events';
var TipoActividadesAprendizaje = require('../../sqldb').TipoActividadesAprendizaje;
var TipoActividadesAprendizajeEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TipoActividadesAprendizajeEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  TipoActividadesAprendizaje.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    TipoActividadesAprendizajeEvents.emit(event + ':' + doc._id, doc);
    TipoActividadesAprendizajeEvents.emit(event, doc);
    done(null);
  }
}

export default TipoActividadesAprendizajeEvents;
