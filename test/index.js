var proxyquire = require('proxyquire')
  , through = require('through')
  , test = require('tape')

var emptyRaf = Function()
emptyRaf.cancel = Function()

function asyncRaf(cb) {
  return setTimeout(function() {
    cb()
  }, 0)
}

asyncRaf.cancel = function(id) {
  clearTimeout(id)
}

test('returns a stream', function(t) {
  t.plan(1)

  var rAS = proxyquire('../', {raf: emptyRaf})

  t.doesNotThrow(function() {
    through().pipe(rAS()).pipe(through())
  })
})

test('does not emit until raf callback is called', function(t) {
  t.plan(1)

  var rAS = proxyquire('../', {})

  var stream = rAS()

  stream.on('data', function(data) {
    t.equal(data, 'yay')
    stream.end()
  })

  stream.write('boo')
  stream.write('boo')
  stream.write('yay')
})

test('loops until `.end()`d', function(t) {
  t.plan(2)

  var rAS = proxyquire('../', {raf: asyncRaf})

  var stream = rAS()

  stream.once('data', function(data) {
    t.equal(data, 'yay')

    stream.once('data', function(data) {
      t.equal(data, 'lol')
      stream.end()
    })

    stream.write('lol')
  })

  stream.write('yay')
})

test('flush option writes any buffered, unwritten data on end', function(t) {
  t.plan(1)

  var rAS = proxyquire('../', {raf: asyncRaf})

  var stream = rAS(true)

  stream.on('data', function(data) {
    t.equal(data, 'flush!')
  })

  stream.write('flush!')
  stream.end()
})

test('emits after raf callback even with no update', function(t) {
  t.plan(2)

  var rAS = proxyquire('../', {raf: asyncRaf})

  var stream = rAS(true, true)

  stream.once('data', function(data) {
    t.equal(data, 'yay')

    stream.once('data', function(data) {
      t.equal(data, 'yay')
      stream.end()
    })
  })

  stream.write('yay')
})

test('does not choke on emitting with no initial data', function(t) {
  t.plan(2)

  var rAS = proxyquire('../', {raf: asyncRaf})

  var stream = rAS(true, true)

  stream.once('data', function(data) {
    t.equal(data, undefined)

    stream.once('data', function(data) {
      t.equal(data, undefined)
      stream.end()
    })
  })
})
