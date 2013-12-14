(function(root) {
    var common = typeof module != 'undefined' && !!module.exports
      , aok = common ? require('../node_modules/aok') : root.aok
      , cxn = common ? require('../src') : root.cxn
      , doc = typeof document != 'undefined' && document
      , docElem = doc.documentElement;
      
    aok({ id:'.online', test: cxn.online() === !cxn.offline() });
    aok({ id:'.offline', test: cxn.offline() === !cxn.online() });
    aok({ id:'.state', test: cxn.state() === (cxn.online() ? 'online' : 'offline') });
    aok({ id:'.stable', test: typeof cxn.stable() == 'boolean' });
    aok({ id:'.unstable', test: cxn.stable() ? !cxn.unstable() : cxn.unstable() || cxn.offline() });
    aok({ id:'.lost', test: typeof cxn.lost == 'function' });
    aok({ id:'.found', test: typeof cxn.found == 'function' });
    docElem && aok({ id:'[data-cxn]', test: null != docElem.getAttribute('data-cxn') });
}(this));