/**
 * Actividades model events
 */

'use strict';

import {EventEmitter} from 'events';
var Actividades = require('../../sqldb').Actividades;
var ActividadesEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ActividadesEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Actividades.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    ActividadesEvents.emit(event + ':' + doc._id, doc);
    ActividadesEvents.emit(event, doc);
    done(null);
  }
}

export default ActividadesEvents;
