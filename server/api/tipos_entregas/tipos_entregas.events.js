/**
 * TiposEntregas model events
 */

'use strict';

import {EventEmitter} from 'events';
var TiposEntregas = require('../../sqldb').TiposEntregas;
var TiposEntregasEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TiposEntregasEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  TiposEntregas.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    TiposEntregasEvents.emit(event + ':' + doc._id, doc);
    TiposEntregasEvents.emit(event, doc);
    done(null);
  }
}

export default TiposEntregasEvents;
