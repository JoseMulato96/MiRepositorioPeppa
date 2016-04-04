/**
 * TiposSangre model events
 */

'use strict';

import {EventEmitter} from 'events';
var TiposSangre = require('../../sqldb').TiposSangre;
var TiposSangreEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TiposSangreEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  TiposSangre.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    TiposSangreEvents.emit(event + ':' + doc.id_tipo_sangre, doc);
    TiposSangreEvents.emit(event, doc);
    done(null);
  }
}

export default TiposSangreEvents;
