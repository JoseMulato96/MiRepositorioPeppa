/**
 * UnidadesMedida model events
 */

'use strict';

import {EventEmitter} from 'events';
var UnidadesMedida = require('../../sqldb').UnidadesMedida;
var UnidadesMedidaEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
UnidadesMedidaEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  UnidadesMedida.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    UnidadesMedidaEvents.emit(event + ':' + doc._id, doc);
    UnidadesMedidaEvents.emit(event, doc);
    done(null);
  }
}

export default UnidadesMedidaEvents;
