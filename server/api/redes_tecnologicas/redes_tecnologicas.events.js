/**
 * RedesTecnologicas model events
 */

'use strict';

import {EventEmitter} from 'events';
var RedesTecnologicas = require('../../sqldb').RedesTecnologicas;
var RedesTecnologicasEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
RedesTecnologicasEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  RedesTecnologicas.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    RedesTecnologicasEvents.emit(event + ':' + doc._id, doc);
    RedesTecnologicasEvents.emit(event, doc);
    done(null);
  }
}

export default RedesTecnologicasEvents;
