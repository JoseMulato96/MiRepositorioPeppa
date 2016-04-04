/**
 * ActividadesAprendizaje model events
 */

'use strict';

import {EventEmitter} from 'events';
var ActividadesAprendizaje = require('../../sqldb').ActividadesAprendizaje;
var ActividadesAprendizajeEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ActividadesAprendizajeEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  ActividadesAprendizaje.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    ActividadesAprendizajeEvents.emit(event + ':' + doc._id, doc);
    ActividadesAprendizajeEvents.emit(event, doc);
    done(null);
  }
}

export default ActividadesAprendizajeEvents;
