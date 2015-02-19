var through = require('through')
  , raf = require('raf')

module.exports = requestAnimationStream

function requestAnimationStream(flush) {
  var lastValue = null
  var stream = through(write, end)
  var handler = raf(onFrame)

  var queued = false
  var ended = false

  return stream

  function write(data) {
    queued = true
    lastValue = data
  }

  function end() {
    if(flush && queued && !ended) {
      stream.queue(lastValue)
    }

    ended = true
    raf.cancel(handler)
    stream.queue(null)
  }

  function onFrame() {
    if(ended) {
      return
    }

    if(queued) {
      queued = false
      stream.queue(lastValue)
    }

    handler = raf(onFrame)
  }
}
