/**
 * Regionales model events
 */

'use strict';

import {EventEmitter} from 'events';
var Regionales = require('../../sqldb').Regionales;
var RegionalesEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
RegionalesEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Regionales.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    RegionalesEvents.emit(event + ':' + doc.id_regional, doc);
    RegionalesEvents.emit(event, doc);
    done(null);
  }
}

export default RegionalesEvents;
