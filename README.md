# `=`[cxn](../../)
#### Network connection JavaScript [module](https://npmjs.org/package/cxn) with online/offline events

```sh
$ npm install cxn
```

## API ([0.2](../../releases))

#### `cxn.online(listener?)` &rArr; `boolean` true if online
#### `cxn.offline(listener?)` &rArr; `boolean` true if offline
#### `cxn.line(listener?)` &rArr; `boolean` listen to online and offline
#### `cxn.stable()` &rArr; `boolean` true if never offline
#### `cxn.unstable()` &rArr; `number` times connection state changed
#### `cxn.elapsed()` &rArr; `number` ms since runtime
#### `cxn.interim()` &rArr; `number` ms at current state
#### `cxn.lost(listener)` &rArr; `boolean` true on success
#### `cxn.found(listener)` &rArr; `boolean` true on success
#### `cxn.bandwidth()` &rArr; `number` MB/s (0 if offline)
#### `cxn.metered()` &rArr; `boolean` true if data usage is metered

## CSS
#### `html[data-cxn]` reports state
```css
[data-cxn~="online"] { background:snow; }
[data-cxn~="offline"] { background:gray; }
```

## License

[MIT](http://opensource.org/licenses/MIT)