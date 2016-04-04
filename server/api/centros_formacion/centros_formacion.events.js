/**
 * CentrosFormacion model events
 */

'use strict';

import {EventEmitter} from 'events';
var CentrosFormacion = require('../../sqldb').CentrosFormacion;
var CentrosFormacionEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CentrosFormacionEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  CentrosFormacion.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    CentrosFormacionEvents.emit(event + ':' + doc.id_centro_formacion, doc);
    CentrosFormacionEvents.emit(event, doc);
    done(null);
  }
}

export default CentrosFormacionEvents;
