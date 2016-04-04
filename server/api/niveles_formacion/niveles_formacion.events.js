/**
 * NivelesFormacion model events
 */

'use strict';

import {EventEmitter} from 'events';
var NivelesFormacion = require('../../sqldb').NivelesFormacion;
var NivelesFormacionEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
NivelesFormacionEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  NivelesFormacion.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    NivelesFormacionEvents.emit(event + ':' + doc._id, doc);
    NivelesFormacionEvents.emit(event, doc);
    done(null);
  }
}

export default NivelesFormacionEvents;
