/**
 * TiposEvidencias model events
 */

'use strict';

import {EventEmitter} from 'events';
var TiposEvidencias = require('../../sqldb').TiposEvidencias;
var TiposEvidenciasEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TiposEvidenciasEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  TiposEvidencias.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    TiposEvidenciasEvents.emit(event + ':' + doc._id, doc);
    TiposEvidenciasEvents.emit(event, doc);
    done(null);
  }
}

export default TiposEvidenciasEvents;
