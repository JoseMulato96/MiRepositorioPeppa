/**
 * ConocimientosConceptosPrincipios model events
 */

'use strict';

import {EventEmitter} from 'events';
var ConocimientosConceptosPrincipios = require('../../sqldb').ConocimientosConceptosPrincipios;
var ConocimientosConceptosPrincipiosEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ConocimientosConceptosPrincipiosEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  ConocimientosConceptosPrincipios.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    ConocimientosConceptosPrincipiosEvents.emit(event + ':' + doc._id, doc);
    ConocimientosConceptosPrincipiosEvents.emit(event, doc);
    done(null);
  }
}

export default ConocimientosConceptosPrincipiosEvents;
