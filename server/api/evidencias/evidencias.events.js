/**
 * Evidencias model events
 */

'use strict';

import {EventEmitter} from 'events';
var Evidencias = require('../../sqldb').Evidencias;
var EvidenciasEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
EvidenciasEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Evidencias.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    EvidenciasEvents.emit(event + ':' + doc._id, doc);
    EvidenciasEvents.emit(event, doc);
    done(null);
  }
}

export default EvidenciasEvents;
