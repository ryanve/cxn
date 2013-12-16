(function(root) {
    var server = typeof window == 'undefined'
      , aok = server ? require('../node_modules/aok') : root.aok
      , cxn = server ? require('../src') : root.cxn;
    
    aok({ id:'.online', test: cxn.online() === !cxn.offline() });
    aok({ id:'.offline', test: cxn.offline() === !cxn.online() });
    aok({ id:'.state', test: cxn.state() === (cxn.online() ? 'online' : 'offline') });
    aok({ id:'.stable', test: typeof cxn.stable() == 'boolean' });
    aok({ id:'.unstable', test: cxn.stable() ? !cxn.unstable() : cxn.unstable() || cxn.offline() });
    aok({ id:'.lost', test: typeof cxn.lost == 'function' });
    aok({ id:'.found', test: typeof cxn.found == 'function' });

    server ? aok.pass(['state', 'online', 'offline', 'stable', 'unstable'], function(method) {
        aok.log(method + ': ' + cxn[method]());
    }) : aok({ 
        id:'[data-cxn]'
      , test: typeof document.documentElement.getAttribute('data-cxn') == 'string' 
    });

    server || aok.pass(['online', 'offline'], function(type) {
        aok.info('window has ' + type + ' event:', ('on' + type) in window);
        aok.info('<body> has ' + type + ' event:', ('on' + type) in document.body);
    });
}(this));