# browserify-row-flow
Log data about the flow of rows through the browserify pipeline, for debugging purposes.

# Usage
```js
var row_flow = require('browserify-row-flow');
browserify()
  .plugin(row_flow().plugin())
```
