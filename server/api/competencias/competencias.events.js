/**
 * Competencias model events
 */

'use strict';

import {EventEmitter} from 'events';
var Competencias = require('../../sqldb').Competencias;
var CompetenciasEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CompetenciasEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Competencias.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    CompetenciasEvents.emit(event + ':' + doc._id, doc);
    CompetenciasEvents.emit(event, doc);
    done(null);
  }
}

export default CompetenciasEvents;
