/**
 * LineasTecnologicas model events
 */

'use strict';

import {EventEmitter} from 'events';
var LineasTecnologicas = require('../../sqldb').LineasTecnologicas;
var LineasTecnologicasEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
LineasTecnologicasEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  LineasTecnologicas.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    LineasTecnologicasEvents.emit(event + ':' + doc._id, doc);
    LineasTecnologicasEvents.emit(event, doc);
    done(null);
  }
}

export default LineasTecnologicasEvents;
