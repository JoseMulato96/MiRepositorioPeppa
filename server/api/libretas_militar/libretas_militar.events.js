/**
 * LibretasMilitar model events
 */

'use strict';

import {EventEmitter} from 'events';
var LibretasMilitar = require('../../sqldb').LibretasMilitar;
var LibretasMilitarEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
LibretasMilitarEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  LibretasMilitar.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    LibretasMilitarEvents.emit(event + ':' + doc.id_libreta_militar, doc);
    LibretasMilitarEvents.emit(event, doc);
    done(null);
  }
}

export default LibretasMilitarEvents;
