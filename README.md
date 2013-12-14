# `=`[cxn](../../)
#### Network connection JavaScript [module](https://npmjs.org/package/cxn) with online/offline events

```sh
$ npm install cxn
```

## API ([0.1](../../releases))

#### `cxn.online(listener?)` &rArr; `boolean` true if online
#### `cxn.offline(listener?)` &rArr; `boolean` true if offline
#### `cxn.state(listener?)` &rArr; `string` 'online' or 'offline' (listens to both)
#### `cxn.stable()` &rArr; `boolean` true if never offline
#### `cxn.unstable()` &rArr; `number` times connection state changed
#### `cxn.lost(listener)` &rArr; `boolean` true on success
#### `cxn.found(listener)` &rArr; `boolean` true on success
#### `cxn.duration(since?)` &rArr; `number` ms
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
