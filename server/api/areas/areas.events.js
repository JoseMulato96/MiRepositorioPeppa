/**
 * Areas model events
 */

'use strict';

import {EventEmitter} from 'events';
var Areas = require('../../sqldb').Areas;
var AreasEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
AreasEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Areas.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    AreasEvents.emit(event + ':' + doc.id_area, doc);
    AreasEvents.emit(event, doc);
    done(null);
  }
}

export default AreasEvents;
