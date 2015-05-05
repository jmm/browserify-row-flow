module.exports = Row_Flow;

var
  through = require('through2');

function Row_Flow () {
  if (! (this instanceof Row_Flow)) return new Row_Flow();
}

Row_Flow.prototype.plugin = function () {
  var
    self = this;

  return function row_flow (b, opts) {
    var
      stream,
      offset = 2,
      i = -1;
    while (++i < b.pipeline.length) {
      stream = through.obj(self.log.phase);
      stream.label = 'phase:' + b.pipeline.get(i).label + ':after';
      b.pipeline.splice(++i, 0, stream);
    }

    [
      {id: 'file', args: ['file', 'id', 'parent']},
      {id: 'dep', args: ['row']},
    ].forEach(function (event) {
      b.on(event.id, self.log.event(event));
    });
  }
}
// plugin

Row_Flow.prototype.log = {};

Row_Flow.prototype.log.phase = function log_phase (row, enc, done) {
  console.log(this.label, ':', row, '\n');
  done(null, row);
}

Row_Flow.prototype.log.event = function log_event (event) {
  return function () {
    var
      args = arguments,
      named_args = {};
    event.args.forEach(function (key, i) {
      named_args[key] = args[i];
    });
    console.log('event:' + event.id, named_args, '\n');
  };
}
