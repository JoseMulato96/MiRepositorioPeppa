/**
 * TiposVocero model events
 */

'use strict';

import {EventEmitter} from 'events';
var TiposVocero = require('../../sqldb').TiposVocero;
var TiposVoceroEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TiposVoceroEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  TiposVocero.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    TiposVoceroEvents.emit(event + ':' + doc.id_tipo_vocero, doc);
    TiposVoceroEvents.emit(event, doc);
    done(null);
  }
}

export default TiposVoceroEvents;
