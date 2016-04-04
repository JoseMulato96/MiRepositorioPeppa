/**
 * Estados model events
 */

'use strict';

import {EventEmitter} from 'events';
var Estados = require('../../sqldb').Estados;
var EstadosEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
EstadosEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Estados.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    EstadosEvents.emit(event + ':' + doc.id_estado, doc);
    EstadosEvents.emit(event, doc);
    done(null);
  }
}

export default EstadosEvents;
