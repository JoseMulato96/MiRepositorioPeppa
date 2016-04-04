/**
 * TecnicasDidacticas model events
 */

'use strict';

import {EventEmitter} from 'events';
var TecnicasDidacticas = require('../../sqldb').TecnicasDidacticas;
var TecnicasDidacticasEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TecnicasDidacticasEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  TecnicasDidacticas.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    TecnicasDidacticasEvents.emit(event + ':' + doc._id, doc);
    TecnicasDidacticasEvents.emit(event, doc);
    done(null);
  }
}

export default TecnicasDidacticasEvents;
