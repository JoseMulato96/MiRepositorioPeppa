/**
 * Fichas model events
 */

'use strict';

import {EventEmitter} from 'events';
var Fichas = require('../../sqldb').Fichas;
var FichasEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
FichasEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Fichas.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    FichasEvents.emit(event + ':' + doc._id, doc);
    FichasEvents.emit(event, doc);
    done(null);
  }
}

export default FichasEvents;
