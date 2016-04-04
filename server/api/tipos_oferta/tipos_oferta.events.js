/**
 * TiposOferta model events
 */

'use strict';

import {EventEmitter} from 'events';
var TiposOferta = require('../../sqldb').TiposOferta;
var TiposOfertaEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TiposOfertaEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  TiposOferta.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    TiposOfertaEvents.emit(event + ':' + doc.id_tipo_oferta, doc);
    TiposOfertaEvents.emit(event, doc);
    done(null);
  }
}

export default TiposOfertaEvents;
