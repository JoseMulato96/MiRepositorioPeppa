/**
 * TiposCompetencia model events
 */

'use strict';

import {EventEmitter} from 'events';
var TiposCompetencia = require('../../sqldb').TiposCompetencia;
var TiposCompetenciaEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TiposCompetenciaEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  TiposCompetencia.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    TiposCompetenciaEvents.emit(event + ':' + doc._id, doc);
    TiposCompetenciaEvents.emit(event, doc);
    done(null);
  }
}

export default TiposCompetenciaEvents;
