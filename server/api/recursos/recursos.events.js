/**
 * Recursos model events
 */

'use strict';

import {EventEmitter} from 'events';
var Recursos = require('../../sqldb').Recursos;
var RecursosEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
RecursosEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Recursos.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    RecursosEvents.emit(event + ':' + doc._id, doc);
    RecursosEvents.emit(event, doc);
    done(null);
  }
}

export default RecursosEvents;
