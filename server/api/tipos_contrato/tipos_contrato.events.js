/**
 * TiposContrato model events
 */

'use strict';

import {EventEmitter} from 'events';
var TiposContrato = require('../../sqldb').TiposContrato;
var TiposContratoEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TiposContratoEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  TiposContrato.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    TiposContratoEvents.emit(event + ':' + doc.id_tipo_contrato, doc);
    TiposContratoEvents.emit(event, doc);
    done(null);
  }
}

export default TiposContratoEvents;
