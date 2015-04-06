# request-animation-stream

[![Build Status](http://img.shields.io/travis/jarofghosts/request-animation-stream.svg?style=flat)](https://travis-ci.org/jarofghosts/request-animation-stream)
[![npm install](http://img.shields.io/npm/dm/request-animation-stream.svg?style=flat)](https://www.npmjs.org/package/request-animation-stream)

streaming interface to `requestAnimationFrame`

## usage

```js
var requestAnimationStream = require('request-animation-stream')

dataSource.pipe(requestAnimationStream()).pipe(viewLayer)

// as dataSource streams, only the latest data (if any) will be emitted on
// animation frame.
```

## API

### `requestAnimationStream(_flush, _alwaysEmit) -> DuplexStream`

* `_flush` is an optional argument that determines if any buffered data will be
  emitted if the stream is ended before the next frame.

* `_alwaysEmit` is an optional argument that determines if the stream will emit
  every frame, even if no new data (most recent data will be emitted. If no data
  has been captured, `undefined` will be emitted).

## license

MIT
