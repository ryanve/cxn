<h1>=<b>cxn</b></h1>
<b>Network connection JavaScript module with online/offline events</b>

```sh
$ npm install cxn --save
```

```js
var cxn = require('cxn')
```

## API

#### `cxn.online(listener?)` &rArr; `boolean` true if online
#### `cxn.offline(listener?)` &rArr; `boolean` true if offline
#### `cxn.line(listener?)` &rArr; `cxn` listen to online and offline
#### `cxn.unline(listener?)` &rArr; `cxn` unlisten to online and offline
#### `cxn.stable()` &rArr; `boolean` true if initial connection state persists
#### `cxn.unstable()` &rArr; `number` times connection state changed
#### `cxn.elapsed()` &rArr; `number` ms since runtime
#### `cxn.interim()` &rArr; `number` ms at current state
#### `cxn.gap()` &rArr; `number` ms at current offline state (0 if online)
#### `cxn.life()` &rArr; `number` ms at current online state (0 if offline)
#### `cxn.late()` &rArr; `number` ms to first go online, Infinity if not yet, 0 if started online
#### `cxn.bandwidth()` &rArr; `number` MB/s (0 if offline)
#### `cxn.metered()` &rArr; `boolean` true if data usage is metered
#### `cxn.wire(event, listener?)` &rArr; `cxn` listen
#### `cxn.unwire(event, listener?)` &rArr; `cxn` unlisten
#### `cxn.listeners(event)` &rArr; `Array` listeners
#### `cxn.emit(event)` &rArr; `number` listeners fired

## CSS

#### `html[data-cxn]` reports states

```css
[data-cxn~="stable"] { border-top:4px solid blue }
[data-cxn~="unstable"] { border-top:4px dotted yellow }
[data-cxn~="online"] { border-top-color:green }
[data-cxn~="offline"] { border-top-color:red }
```
