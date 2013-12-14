# `=`[cxn](../../)
#### Network connection JavaScript [module](https://npmjs.org/package/cxn) with online/offline events

```sh
$ npm install cxn
```

## API ([0.1](../../releases))

#### `cxn.state(fn?)` &rArr; `string`
#### `cxn.online(fn?)` &rArr; `boolean`
#### `cxn.offline(fn?)` &rArr; `boolean`
#### `cxn.stable()` &rArr; `boolean` true if never offline
#### `cxn.unstable()` &rArr; `number` times connection state changed
#### `cxn.lost(fn)` &rArr; `boolean` true on success
#### `cxn.found(fn)` &rArr; `boolean` true on success
#### `cxn.duration(since?)` &rArr; `number` ms
#### `cxn.bandwidth()` &rArr; `number` MB/s
#### `cxn.metered()` &rArr; `boolean`

## License

[MIT](http://opensource.org/licenses/MIT)
