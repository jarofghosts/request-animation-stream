# request-animation-stream

streaming interface to `requestAnimationFrame`

## usage

```js
var requestAnimationStream = require('request-animation-stream')

dataSource.pipe(requestAnimationStream()).pipe(viewLayer)
```

## API

### `requestAnimationStream(_flush) -> DuplexStream`

* `_flush` is an optional argument that determines if any buffered data will be
  emitted if the stream is ended before the next frame.

## license

MIT
