(function(root) {
    var server = typeof window == 'undefined'
      , aok = server ? require('../node_modules/aok') : root.aok
      , cxn = server ? require('../src') : root.cxn;
    
    aok({ id:'.online', test: cxn.online() === !cxn.offline() });
    aok({ id:'.offline', test: cxn.offline() === !cxn.online() });
    aok({ id:'.stable', test: typeof cxn.stable() == 'boolean' });
    aok({ id:'.unstable', test: cxn.stable() ? !cxn.unstable() : cxn.unstable() });
    aok({ id:'.line', test: typeof cxn.line() == 'boolean' });
    aok({ id:'.late', test: typeof cxn.late() == 'number' });
    aok({ id:'.lost', test: typeof cxn.lost == 'function' });
    aok({ id:'.found', test: typeof cxn.found == 'function' });
    aok({ id:'.elapsed', test: typeof cxn.elapsed() === 'number' });
    aok({ id:'.interim', test: cxn.interim() <= cxn.elapsed() });
    aok({ id:'.gap', test: cxn.gap() ? !cxn.life() : 0 === cxn.gap() });
    aok({ id:'.life', test: cxn.life() ? !cxn.gap() : 0 === cxn.life() });

    server ? aok.pass(['online', 'offline', 'stable', 'unstable'], function(method) {
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