/**
 * TiposDocumento model events
 */

'use strict';

import {EventEmitter} from 'events';
var TiposDocumento = require('../../sqldb').TiposDocumento;
var TiposDocumentoEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TiposDocumentoEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  TiposDocumento.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    TiposDocumentoEvents.emit(event + ':' + doc.id_tipo_documento, doc);
    TiposDocumentoEvents.emit(event, doc);
    done(null);
  }
}

export default TiposDocumentoEvents;
