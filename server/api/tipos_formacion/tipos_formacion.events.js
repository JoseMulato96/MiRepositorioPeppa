/**
 * TiposFormacion model events
 */

'use strict';

import {EventEmitter} from 'events';
var TiposFormacion = require('../../sqldb').TiposFormacion;
var TiposFormacionEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TiposFormacionEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  TiposFormacion.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    TiposFormacionEvents.emit(event + ':' + doc._id, doc);
    TiposFormacionEvents.emit(event, doc);
    done(null);
  }
}

export default TiposFormacionEvents;
