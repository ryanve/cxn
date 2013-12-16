# `=`[cxn](../../)
#### Network connection JavaScript [module](https://npmjs.org/package/cxn) with online/offline events

```sh
$ npm install cxn
```

## API ([0.3](../../releases))

#### `cxn.online(listener?)` &rArr; `boolean` true if online
#### `cxn.offline(listener?)` &rArr; `boolean` true if offline
#### `cxn.line(listener?)` &rArr; `boolean` listen to online and offline
#### `cxn.stable()` &rArr; `boolean` true initial connection state persists
#### `cxn.unstable()` &rArr; `number` times connection state changed
#### `cxn.elapsed()` &rArr; `number` ms since runtime
#### `cxn.interim()` &rArr; `number` ms at current state
#### `cxn.gap()` &rArr; `number` ms at current offline state (0 if online)
#### `cxn.life()` &rArr; `number` ms at current online state (0 if offline)
#### `cxn.late()` &rArr; `number` ms to first go online, Infinity if never online, 0 if never offline
#### `cxn.lost(listener)` &rArr; `boolean` true on success
#### `cxn.found(listener)` &rArr; `boolean` true on success
#### `cxn.bandwidth()` &rArr; `number` MB/s (0 if offline)
#### `cxn.metered()` &rArr; `boolean` true if data usage is metered

## CSS
#### `html[data-cxn]` reports states
```css
[data-cxn~="stable"] { border-top:4px solid blue }
[data-cxn~="unstable"] { border-top:4px dotted yellow }
[data-cxn~="online"] { border-top-color:green }
[data-cxn~="offline"] { border-top-color:red }
```

## License

[MIT](http://opensource.org/licenses/MIT)